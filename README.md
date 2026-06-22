# StoreMind

Perakende mağaza zekâsı — Neurons ekosisteminin retail dikeyi. Mevcut kameraları akıllı izleme sistemine çevirir: raf takibi, düşme/dökülme tespiti, plaka/araç, soğuk oda kapısı, güvenlik.

StoreMind **tüketici**dir (producer değil): event formatı icat etmez, mesajlaşma token'ı tutmaz, üretici kod yazmaz.

## Yapı
- `sql/` — Supabase şema, RLS (multi-tenant), store_events, v_store_events_feed, demo seed. Sırayla SQL editöründe çalıştırılır (01→05).
- `supabase/functions/ingest-facemind/` — kaynak-agnostik ingest (FaceMind/CamMind → store_events). `x-ingest-secret` ile.
- `supabase/functions/dashboard-data/` — read-only dashboard JSON (service_role, anon key gerekmez).
- `app/demo/page.tsx` — operasyon paneli (Next.js client component). İzometrik 3D harita, 3D otopark, son-6-event kanıt kartları, TR/EN.
- `landing_live/` — canlı landing (storemind.ant-soft.uk) + `/demo/`. Statik; `wrangler pages deploy . --project-name=storemind`.

## Altyapı
- Supabase: `ulolaujtarzuvhopiktu` (Frankfurt)
- Cloudflare Pages: `storemind` → storemind.ant-soft.uk
- Stack: Next.js (App Router) + Tailwind + @supabase/supabase-js

## Deploy (demo + landing)
```
cd landing_live && npx wrangler pages deploy . --project-name=storemind --branch=production
```
