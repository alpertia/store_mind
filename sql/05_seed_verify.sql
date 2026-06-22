-- ═══════════════════════════════════════════════════════════════
--  StoreMind — Seed + Doğrulama (TEK DOSYA, idempotent)  v0.4
--  Çalıştırma: SQL Editor → yapıştır → Run.
--  Sonuç: TEK hücre JSON ('out'). Kopyala-yapıştır hazır.
--  İdempotent: başta test verisini siler → tekrar çalıştırmak güvenli.
-- ═══════════════════════════════════════════════════════════════

-- ── 0) Önceki test verisini temizle (yalnızca iki test mağazası) ──
delete from baskets where store_id in (select id from stores where slug in ('storemind-demo','rakip-sube-1'));
delete from inventory where store_id in (select id from stores where slug in ('storemind-demo','rakip-sube-1'));
delete from products where store_id in (select id from stores where slug in ('storemind-demo','rakip-sube-1'));
-- (basket_items, baskets silinince cascade ile gider)

-- ── Hesap + mağaza gar-anti ──
insert into accounts (slug, name) values ('demo-account','StoreMind Demo Hesap') on conflict (slug) do nothing;
update stores set account_id = (select id from accounts where slug='demo-account')
 where slug='storemind-demo' and account_id is null;

insert into accounts (slug, name) values ('rakip-market','Rakip Market A.Ş.') on conflict (slug) do nothing;
insert into stores (slug, display_name, fixed_daily_cost, account_id)
values ('rakip-sube-1','Rakip Market — Şube 1', 3000.00, (select id from accounts where slug='rakip-market'))
on conflict (slug) do nothing;

-- ── 1) Demo ürün kataloğu ──
insert into products (store_id, sku, name, category, cost_price, sell_price)
select (select id from stores where slug='storemind-demo'), v.sku, v.name, v.cat, v.cost, v.sell
from (values
  ('EKM','Ekmek','Fırın',4.00,7.50),
  ('SUT','Süt 1L','Süt Ürün',18.00,28.00),
  ('KHV','Kahve','Sıcak İçecek',60.00,110.00),
  ('BIS','Bisküvi','Atıştırmalık',9.00,16.00),
  ('CIK','Çikolata','Atıştırmalık',22.00,39.00)
) as v(sku,name,cat,cost,sell)
on conflict (store_id, sku) do nothing;

-- ── 2) Stok (Bisküvi kritik) ──
insert into inventory (store_id, product_id, current_stock, min_stock_level, reorder_qty, supplier_name, avg_delivery_days)
select p.store_id, p.id,
       case p.sku when 'BIS' then 8 else 120 end,
       case p.sku when 'BIS' then 30 else 40 end,
       60, 'Ana Tedarikçi', 2
from products p
where p.store_id = (select id from stores where slug='storemind-demo')
on conflict (store_id, product_id) do nothing;

-- ── 3) Toplu sepetler (bugün) ──
insert into baskets (store_id, channel, total_amount, total_cost, item_count, created_at)
select s.id, 'in_store', g.amt, round(g.amt*0.66,2), 1+(random()*4)::int,
       date_trunc('day',now()) + (random()*(now()-date_trunc('day',now())))
from stores s,
  lateral (select round((40+random()*150)::numeric,2) as amt from generate_series(1,50)) g
where s.slug='storemind-demo';

-- ── 4) Detaylı sepetler + kalemler (Ekmek+Süt+Kahve birlikte) ──
with det as (
  insert into baskets (store_id, channel, total_amount, total_cost, item_count, created_at)
  select (select id from stores where slug='storemind-demo'),'in_store',145.50,82.00,3,
         date_trunc('day',now()) + interval '9 hours'
  from generate_series(1,6)
  returning id, store_id
)
insert into basket_items (basket_id, product_id, quantity, unit_price, unit_cost, line_total)
select d.id, p.id, 1, p.sell_price, p.cost_price, p.sell_price
from det d
join products p on p.store_id=d.store_id and p.sku in ('EKM','SUT','KHV');

-- ── 5) Rakip mağaza sepetleri ──
insert into baskets (store_id, channel, total_amount, total_cost, item_count, created_at)
select s.id, 'in_store', g.amt, round(g.amt*0.70,2), 1+(random()*3)::int,
       date_trunc('day',now()) + (random()*(now()-date_trunc('day',now())))
from stores s,
  lateral (select round((30+random()*90)::numeric,2) as amt from generate_series(1,20)) g
where s.slug='rakip-sube-1';

-- ═══════════════════════════════════════════════════════════════
--  DOĞRULAMA — TEK HÜCRE JSON
-- ═══════════════════════════════════════════════════════════════
select jsonb_build_object(
  'db','storemind',
  'dashboard',(select coalesce(jsonb_agg(to_jsonb(d)),'[]') from manager_live_dashboard d),
  'product_perf',(select coalesce(jsonb_agg(jsonb_build_object('name',pp.name,'revenue',pp.revenue,'margin_pct',pp.margin_pct)),'[]') from v_product_performance pp where pp.revenue>0),
  'basket_pairs',(select coalesce(jsonb_agg(jsonb_build_object('a',pa.name,'b',pb.name,'together',bp.together_count)),'[]') from v_basket_pairs bp join products pa on pa.id=bp.product_a join products pb on pb.id=bp.product_b),
  'inventory_critical',(select coalesce(jsonb_agg(jsonb_build_object('item',ic.item_name,'status',ic.stock_status)),'[]') from v_inventory_critical ic)
) as out;
