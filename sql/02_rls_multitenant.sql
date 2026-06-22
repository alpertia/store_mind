-- ═══════════════════════════════════════════════════════════════
--  StoreMind — Çok Kiracılı RLS Migration (v0.2)
--  v0.1 şemasının ÜSTÜNE eklenir (additive). Baştan yazmaz.
--  Çalıştırma: aynı projede SQL Editor → yapıştır → Run.
--
--  Hiyerarşi:  account (abone işletme)
--                └── store (şube)
--                      └── products / baskets / customers / inventory / alerts
--  Bir kullanıcı (auth.users) bir veya birden çok account'a üye olabilir;
--  yalnızca üyesi olduğu account'ların mağaza verisini görür.
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
--  1) HESAP (SaaS abonesi / perakende işletmesi)
-- ─────────────────────────────────────────────
create table if not exists accounts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  plan        text not null default 'trial',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────
--  2) ÜYELİK (auth kullanıcı ↔ hesap bağı + rol)
-- ─────────────────────────────────────────────
create table if not exists memberships (
  id          uuid primary key default gen_random_uuid(),
  account_id  uuid not null references accounts(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        text not null default 'owner' check (role in ('owner','manager','staff')),
  created_at  timestamptz not null default now(),
  unique (account_id, user_id)
);
create index if not exists idx_memberships_user on memberships (user_id);

-- ─────────────────────────────────────────────
--  3) stores'a hesap bağı ekle (mevcut tabloyu BOZMADAN)
-- ─────────────────────────────────────────────
alter table stores add column if not exists account_id uuid references accounts(id) on delete cascade;
create index if not exists idx_stores_account on stores (account_id);

-- Demo verisini bir varsayılan hesaba iliştir (backfill)
insert into accounts (slug, name) values ('demo-account', 'StoreMind Demo Hesap')
on conflict (slug) do nothing;

update stores
   set account_id = (select id from accounts where slug = 'demo-account')
 where slug = 'storemind-demo' and account_id is null;

-- ─────────────────────────────────────────────
--  4) Yardımcı fonksiyonlar (SECURITY DEFINER → RLS'i atlar, döngü olmaz)
--     Kullanıcının erişebildiği hesap ve mağaza id'lerini döndürür.
-- ─────────────────────────────────────────────
create or replace function app_account_ids()
returns setof uuid language sql security definer stable
set search_path = public as $$
  select account_id from memberships where user_id = auth.uid()
$$;

create or replace function app_store_ids()
returns setof uuid language sql security definer stable
set search_path = public as $$
  select s.id
  from stores s
  join memberships m on m.account_id = s.account_id
  where m.user_id = auth.uid()
$$;

-- ─────────────────────────────────────────────
--  5) RLS POLICY'LERİ
--     (RLS tablolarda v0.1'de zaten enable edilmişti; burada policy ekliyoruz.)
--     service_role tüm policy'leri atlar → backend/seed çalışmaya devam eder.
-- ─────────────────────────────────────────────
alter table accounts    enable row level security;
alter table memberships enable row level security;

-- accounts: yalnızca üyesi olduğun hesaplar
drop policy if exists acc_access on accounts;
create policy acc_access on accounts
  for all using ( id in (select app_account_ids()) )
  with check ( id in (select app_account_ids()) );

-- memberships: yalnızca kendi üyelik satırların (döngüyü kıran basit kural)
drop policy if exists mem_access on memberships;
create policy mem_access on memberships
  for all using ( user_id = auth.uid() )
  with check ( user_id = auth.uid() );

-- stores: yalnızca erişebildiğin hesapların mağazaları
drop policy if exists store_access on stores;
create policy store_access on stores
  for all using ( account_id in (select app_account_ids()) )
  with check ( account_id in (select app_account_ids()) );

-- store_id taşıyan tablolar
drop policy if exists prod_access on products;
create policy prod_access on products
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

drop policy if exists inv_access on inventory;
create policy inv_access on inventory
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

drop policy if exists cust_access on customers;
create policy cust_access on customers
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

drop policy if exists basket_access on baskets;
create policy basket_access on baskets
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

drop policy if exists alert_access on alerts;
create policy alert_access on alerts
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

-- basket_items: store_id yok, basket üzerinden kapsanır
drop policy if exists bitems_access on basket_items;
create policy bitems_access on basket_items
  for all using (
    basket_id in (select id from baskets where store_id in (select app_store_ids()))
  )
  with check (
    basket_id in (select id from baskets where store_id in (select app_store_ids()))
  );

-- ─────────────────────────────────────────────
--  6) VIEW GÜVENLİĞİ (Supabase tuzağı kapatılıyor)
--     Varsayılanda view'ler sahibinin yetkisiyle çalışıp RLS'i ATLAR.
--     security_invoker=true → view, sorgulayan kullanıcının RLS'ine uyar.
-- ─────────────────────────────────────────────
alter view manager_live_dashboard set (security_invoker = true);
alter view v_basket_weight        set (security_invoker = true);
alter view v_product_performance  set (security_invoker = true);
alter view v_basket_pairs         set (security_invoker = true);
alter view v_inventory_critical   set (security_invoker = true);
alter view v_alerts_open          set (security_invoker = true);

-- ═══════════════════════════════════════════════════════════════
--  NOT — İLK KULLANICIYI HESABA BAĞLAMA
--  Auth ile bir kullanıcı kaydolduktan sonra, onu demo hesaba üye yap:
--
--    insert into memberships (account_id, user_id, role)
--    values (
--      (select id from accounts where slug='demo-account'),
--      '<AUTH_USER_UUID>',     -- Authentication → Users sayfasından kopyala
--      'owner'
--    );
--
--  Bu satır olmadan, o kullanıcı RLS yüzünden hiçbir veri göremez (beklenen davranış).
-- ═══════════════════════════════════════════════════════════════
