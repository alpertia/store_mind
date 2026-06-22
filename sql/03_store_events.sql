-- ═══════════════════════════════════════════════════════════════
--  StoreMind — store_events uyum katmanı (ADDITIVE)  v0.5b
--  Mevcut tablo: id, store_id, kind, cam, payload(jsonb), image_url, created_at
--  Bozmuyoruz. Sadece: küçük bir status kolonu + RLS + türetilmiş feed view.
--  Çalıştırma: SQL Editor → yapıştır → Run.
-- ═══════════════════════════════════════════════════════════════

-- 1) Ops yönetimi için status (additive — mevcut yapıya dokunmaz)
alter table store_events
  add column if not exists status text not null default 'open'
  check (status in ('open','ack','resolved'));
alter table store_events
  add column if not exists resolved_at timestamptz;

create index if not exists idx_store_events_feed on store_events (store_id, created_at desc);
create index if not exists idx_store_events_open on store_events (store_id) where status='open';

-- 2) RLS (diğer tablolarla aynı desen; service_role atlar → edge function yazar)
alter table store_events enable row level security;
drop policy if exists se_access on store_events;
create policy se_access on store_events
  for all using ( store_id in (select app_store_ids()) )
  with check ( store_id in (select app_store_ids()) );

-- 3) Türetilmiş feed view — payload'dan normalize alanlar.
--    Dashboard canlı akışı buradan okuyacak. Eski tablo ham kalır.
create or replace view v_store_events_feed as
with base as (
  select
    e.*,
    lower(coalesce(e.payload->>'state', split_part(e.kind,'.',2))) as st
  from store_events e
  where e.status = 'open'
)
select
  b.id, b.store_id,
  coalesce(b.payload->>'source', split_part(b.kind,'.',1))            as source,
  b.st                                                                as state,
  coalesce(b.payload->>'tier',
    case b.st when 'silent' then 'security' when 'maybe' then 'order'
              when 'matched' then 'customer' else 'order' end)        as tier,
  coalesce(b.payload->>'severity',
    case b.st when 'silent' then 'critical' when 'matched' then 'info'
              else 'warning' end)                                     as severity,
  coalesce(b.payload->>'zone', b.cam)                                 as zone,
  coalesce(b.payload->>'title', b.payload->>'text', b.kind)           as title,
  b.payload->>'solution'                                             as solution,
  b.payload->>'action'                                               as action,
  b.payload->>'role'                                                 as role,
  b.cam, b.image_url,
  round(extract(epoch from (now()-b.created_at))/60.0)::int           as age_minutes,
  b.created_at
from base b
order by
  case coalesce(b.payload->>'tier',
    case b.st when 'silent' then 'security' when 'maybe' then 'order'
              when 'matched' then 'customer' else 'order' end)
    when 'security' then 0 when 'order' then 1 else 2 end,
  b.created_at desc;

alter view v_store_events_feed set (security_invoker = true);
