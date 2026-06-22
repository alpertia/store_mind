-- ═══════════════════════════════════════════════════════════════
--  StoreMind — v_store_events_feed (FaceMind gerçek şemasına göre)  v0.6
--  FaceMind face olayı: {kind:"face", matched:bool, score, person_id, best_photo_url, cam_id}
--    matched=true            → customer / info   (tanınan/sadık müşteri)
--    matched=false, score≥.55→ order   / warning (belirsiz, "maybe")
--    matched=false           → security/ critical(tanınmayan, "silent")
--  Ayrıca metin-temelli state (silent/maybe/matched) ve payload override'ları korunur.
--  Ham tabloya DOKUNMAZ; sadece view'i yeniler.
-- ═══════════════════════════════════════════════════════════════
drop view if exists v_store_events_feed;
create view v_store_events_feed as
with base as (
  select
    e.*,
    lower(coalesce(e.payload->>'state', split_part(e.kind,'.',2))) as st,
    (e.payload->>'matched')::boolean                                as matched,
    nullif(e.payload->>'score','')::numeric                         as score,
    lower(coalesce(e.payload->>'kind',''))                          as ev_kind
  from store_events e
  where e.status = 'open'
),
derived as (
  select b.*,
    case
      when b.matched is true                                  then 'customer'
      when b.matched is false and coalesce(b.score,0) >= 0.55 then 'order'
      when b.matched is false                                 then 'security'
      when b.st = 'silent'                                    then 'security'
      when b.st = 'maybe'                                     then 'order'
      when b.st = 'matched'                                   then 'customer'
      else 'order'
    end as d_tier
  from base b
)
select
  d.id, d.store_id,
  coalesce(d.payload->>'source', initcap(split_part(d.kind,'.',1)))   as source,
  case when d.ev_kind = 'face'
       then case when d.matched then 'matched' else 'silent' end
       else coalesce(d.st, case when d.matched then 'matched' else 'silent' end)
  end                                                                 as state,
  coalesce(d.payload->>'tier', d.d_tier)                              as tier,
  coalesce(d.payload->>'severity',
    case d.d_tier when 'security' then 'critical'
                  when 'customer' then 'info' else 'warning' end)     as severity,
  coalesce(d.payload->>'zone', d.cam, d.payload->>'cam_id')           as zone,
  coalesce(d.payload->>'title', d.payload->>'text',
    case when d.ev_kind='face' and d.matched
           then 'Tanınan müşteri: ' || coalesce(d.payload->>'name', d.payload->>'person_id', '')
         when d.ev_kind='face'
           then 'Tanınmayan kişi'
         else d.kind end)                                             as title,
  d.payload->>'solution'                                            as solution,
  d.payload->>'action'                                              as action,
  d.payload->>'role'                                                as role,
  coalesce(d.payload->>'person_id', d.payload->>'client_id', d.payload->>'subject_id') as person_id,
  d.score,
  d.cam,
  coalesce(d.image_url, d.payload->>'best_photo_url')                as image_url,
  round(extract(epoch from (now()-d.created_at))/60.0)::int          as age_minutes,
  d.created_at
from derived d
order by
  case coalesce(d.payload->>'tier', d.d_tier)
    when 'security' then 0 when 'order' then 1 else 2 end,
  d.created_at desc;

alter view v_store_events_feed set (security_invoker = true);
