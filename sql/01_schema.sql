-- ═══════════════════════════════════════════════════════════════
--  StoreMind — Supabase Şema (v0.1)
--  Retail zekâsı. Tez: sabit gider sabit → ağır sepet = daha çok EBITDA.
--  CooksMind ile yapısal kardeş, ama domain RETAIL (masa/mutfak/garson YOK).
--
--  Çalıştırma: Supabase Dashboard → yeni proje (storemind, Frankfurt)
--             → SQL Editor → bu dosyayı yapıştır → Run.
--  Çok kiracılı: her tablo store_id ile izole, RLS ile satır bazında korumalı.
--  App tarafı NEXT_PUBLIC_STORE_ID ile tek mağazaya pinlenir
--  (CooksMind'daki NEXT_PUBLIC_RESTAURANT_ID mantığının birebir karşılığı).
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
--  1) KİRACI KÖKÜ
-- ─────────────────────────────────────────────
create table stores (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,              -- DB/edge anahtarı, değişmez
  display_name      text not null,                     -- müşteri-görünür ad
  currency          text not null default 'TRY',
  timezone          text not null default 'Europe/Istanbul',
  -- başabaş hesabının çekirdeği: günlük sabit gider (kira+personel+enerji…)
  fixed_daily_cost  numeric(12,2) not null default 0,
  created_at        timestamptz not null default now()
);

-- ─────────────────────────────────────────────
--  2) ÜRÜN KATALOĞU
-- ─────────────────────────────────────────────
create table products (
  id           uuid primary key default gen_random_uuid(),
  store_id     uuid not null references stores(id) on delete cascade,
  sku          text not null,
  name         text not null,
  category     text,
  cost_price   numeric(12,2) not null default 0,       -- maliyet → kâr marjı için
  sell_price   numeric(12,2) not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  unique (store_id, sku)
);

-- ─────────────────────────────────────────────
--  3) STOK  (CooksMind v_inventory_critical'ın retail karşılığı)
-- ─────────────────────────────────────────────
create table inventory (
  id               uuid primary key default gen_random_uuid(),
  store_id         uuid not null references stores(id) on delete cascade,
  product_id       uuid not null references products(id) on delete cascade,
  current_stock    numeric(12,2) not null default 0,
  min_stock_level  numeric(12,2) not null default 0,
  reorder_qty      numeric(12,2) not null default 0,
  supplier_name    text,
  avg_delivery_days int,
  last_updated     timestamptz not null default now(),
  unique (store_id, product_id)
);

-- ─────────────────────────────────────────────
--  4) MÜŞTERİ  (loyalty/CRM omurgasıyla uyumlu)
-- ─────────────────────────────────────────────
create table customers (
  id           uuid primary key default gen_random_uuid(),
  store_id     uuid not null references stores(id) on delete cascade,
  full_name    text,
  phone        text,
  email        text,
  first_seen   timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────
--  5) SEPET  ← ürünün kalbi. Her satış işlemi = bir sepet.
-- ─────────────────────────────────────────────
create table baskets (
  id            uuid primary key default gen_random_uuid(),
  store_id      uuid not null references stores(id) on delete cascade,
  customer_id   uuid references customers(id) on delete set null,
  channel       text not null default 'in_store',      -- in_store | online
  total_amount  numeric(12,2) not null default 0,       -- satış tutarı (gelir)
  total_cost    numeric(12,2) not null default 0,       -- COGS → brüt kâr için
  item_count    int not null default 0,
  created_at    timestamptz not null default now()
);

create table basket_items (
  id           uuid primary key default gen_random_uuid(),
  basket_id    uuid not null references baskets(id) on delete cascade,
  product_id   uuid not null references products(id),
  quantity     numeric(12,2) not null default 1,
  unit_price   numeric(12,2) not null default 0,
  unit_cost    numeric(12,2) not null default 0,
  line_total   numeric(12,2) not null default 0
);

-- ─────────────────────────────────────────────
--  6) UYARILAR  (CooksMind ai_alerts → retail anomaliler)
-- ─────────────────────────────────────────────
create table alerts (
  id            uuid primary key default gen_random_uuid(),
  store_id      uuid not null references stores(id) on delete cascade,
  severity      text not null check (severity in ('critical','warning','info')),
  title         text not null,
  description   text,
  triggered_at  timestamptz not null default now(),
  resolved_at   timestamptz
);

-- ── İndeksler (dashboard sorguları için) ──
create index idx_baskets_store_day   on baskets (store_id, created_at);
create index idx_bitems_basket       on basket_items (basket_id);
create index idx_bitems_product      on basket_items (product_id);
create index idx_products_store      on products (store_id);
create index idx_inventory_store     on inventory (store_id);
create index idx_alerts_store_open   on alerts (store_id) where resolved_at is null;


-- ═══════════════════════════════════════════════════════════════
--  ANALİTİK VIEW'LER  — StoreMind'ın "mind" tarafı burada.
--  Dashboard bu view'leri okur (CooksMind'ın view-tabanlı yaklaşımı).
-- ═══════════════════════════════════════════════════════════════

-- (A) Nabız ekranı: günlük retail KPI'ları + başabaş sepeti.
--     Tez burada görünür kılınıyor: ortalama sepet vs. başabaş sepeti.
create or replace view manager_live_dashboard as
with today as (
  select
    b.store_id,
    count(*)                                  as basket_count,
    coalesce(sum(b.total_amount),0)           as daily_revenue,
    coalesce(sum(b.total_amount - b.total_cost),0) as gross_profit,
    coalesce(avg(b.total_amount),0)           as avg_basket_value
  from baskets b
  where b.created_at >= date_trunc('day', now())
  group by b.store_id
)
select
  s.id                       as store_id,
  s.display_name,
  coalesce(t.basket_count,0)      as basket_count,
  coalesce(t.daily_revenue,0)     as daily_revenue,
  coalesce(t.gross_profit,0)      as gross_profit,
  coalesce(t.avg_basket_value,0)  as avg_basket_value,
  -- başabaş sepeti: bugünün sabit giderini bugünün sepet sayısına böl
  case when coalesce(t.basket_count,0) > 0
       then round(s.fixed_daily_cost / t.basket_count, 2)
       else null end          as breakeven_basket_value,
  -- ortalama sepetin başabaşı ne kadar aştığı (sepet başına EBITDA katkısı ~)
  case when coalesce(t.basket_count,0) > 0
       then round(coalesce(t.avg_basket_value,0) - (s.fixed_daily_cost / t.basket_count), 2)
       else null end          as avg_ebitda_contribution
from stores s
left join today t on t.store_id = s.id;

-- (B) Sepet ağırlığı dağılımı: sepetler hangi tutar bantlarında kümeleniyor,
--     başabaşın üstünde olan sepet oranı ne. Eşik tasarımının veri tabanı.
create or replace view v_basket_weight as
select
  b.store_id,
  width_bucket(b.total_amount, 0, 1000, 20) as band,    -- 50'lik bantlar (0–1000)
  count(*)                                   as basket_count,
  round(avg(b.total_amount),2)               as avg_in_band,
  round(avg(b.total_amount - b.total_cost),2) as avg_gross_in_band
from baskets b
where b.created_at >= now() - interval '30 days'
group by b.store_id, band
order by b.store_id, band;

-- (C) Ürün performansı: "satışı yüksek ama kârı düşük" çelişkisini yüzeye çıkarır.
create or replace view v_product_performance as
select
  p.store_id,
  p.id   as product_id,
  p.name,
  p.category,
  coalesce(sum(bi.line_total),0)                          as revenue,
  coalesce(sum(bi.line_total - bi.unit_cost*bi.quantity),0) as gross_profit,
  coalesce(sum(bi.quantity),0)                            as units_sold,
  case when coalesce(sum(bi.line_total),0) > 0
       then round(100.0 * coalesce(sum(bi.line_total - bi.unit_cost*bi.quantity),0)
                  / sum(bi.line_total), 1)
       else 0 end                                         as margin_pct
from products p
left join basket_items bi on bi.product_id = p.id
left join baskets b on b.id = bi.basket_id
   and b.created_at >= now() - interval '30 days'
group by p.store_id, p.id, p.name, p.category;

-- (D) Birlikte satılan ürünler (market basket): çapraz satış + raf yerleşimi.
create or replace view v_basket_pairs as
select
  b.store_id,
  least(a.product_id, c.product_id)    as product_a,
  greatest(a.product_id, c.product_id) as product_b,
  count(distinct b.id)                 as together_count
from basket_items a
join basket_items c
  on a.basket_id = c.basket_id and a.product_id < c.product_id
join baskets b on b.id = a.basket_id
where b.created_at >= now() - interval '90 days'
group by b.store_id, least(a.product_id, c.product_id), greatest(a.product_id, c.product_id)
having count(distinct b.id) >= 5
order by together_count desc;

-- (E) Kritik stok (CooksMind v_inventory_critical karşılığı, retail).
create or replace view v_inventory_critical as
select
  i.store_id,
  i.product_id,
  p.name as item_name,
  i.current_stock,
  i.min_stock_level,
  i.reorder_qty,
  case when i.min_stock_level > 0
       then round(100.0 * i.current_stock / i.min_stock_level, 0)
       else null end as stock_pct,
  case when i.current_stock <= 0 then 'out'
       when i.current_stock < i.min_stock_level then 'low'
       else 'ok' end as stock_status,
  i.supplier_name,
  i.avg_delivery_days,
  i.last_updated
from inventory i
join products p on p.id = i.product_id
where i.current_stock < i.min_stock_level;

-- (F) Açık uyarılar.
create or replace view v_alerts_open as
select id, store_id, severity, title, description, triggered_at,
       round(extract(epoch from (now() - triggered_at))/60.0)::int as age_minutes
from alerts
where resolved_at is null
order by triggered_at desc;


-- ═══════════════════════════════════════════════════════════════
--  RLS — Satır Bazında Güvenlik. Her mağaza SADECE kendi verisini görür.
--  (Rakip iki perakendeci aynı sistemdeyse veri sızıntısı = felaket.)
--  Burada basit kalıp: app, store_id'yi request header/JWT claim'inden alır.
--  Supabase Auth ile bağlandığında policy'ler JWT'deki store_id'ye göre kurulur;
--  şimdilik service_role tüm erişime sahip, anon erişimi kapalı.
-- ═══════════════════════════════════════════════════════════════
alter table stores       enable row level security;
alter table products     enable row level security;
alter table inventory    enable row level security;
alter table customers    enable row level security;
alter table baskets      enable row level security;
alter table basket_items enable row level security;
alter table alerts       enable row level security;

-- NOT: Auth modeli netleşince (JWT'de store_id claim'i) aşağıdaki gibi
-- per-store policy eklenecek. Örnek (sonraki adımda aktif edilecek):
--
--   create policy store_isolation on baskets
--     for all using ( store_id = (auth.jwt() ->> 'store_id')::uuid );
--
-- Şimdilik RLS açık ama policy yok → sadece service_role yazar/okur.
-- Bu, geliştirme başlangıcı için güvenli varsayılan.

-- ─────────────────────────────────────────────
--  SEED: ilk mağaza kaydı (slug + sabit gider). Kendi değerlerinle güncelle.
-- ─────────────────────────────────────────────
insert into stores (slug, display_name, fixed_daily_cost)
values ('storemind-demo', 'StoreMind Demo Mağaza', 4500.00)
on conflict (slug) do nothing;
