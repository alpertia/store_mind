# StoreMind

Perakende mağaza zekâsı — Neurons ekosisteminin retail dikeyi (CooksMind'ın market kardeşi). Mevcut mağaza kameralarını akıllı izleme sistemine çevirir: raf takibi, düşme/dökülme, plaka/araç, soğuk oda kapısı, kasa kuyruğu, güvenlik.

**Lane disiplini:** StoreMind **tüketici**dir — event formatı icat etmez, üretici kod yazmaz, mesajlaşma token'ı tutmaz, başka Mind'ın DB'sine yazmaz. Sadece okur ve orkestre eder.

**Zero Cloud Data:** Yerel işleme bir özellik değil, doğru mimari. Veri mağazanın sınırında kalır = KVKK/GDPR yapısal olarak sağlanır ("rozet değil, mimari").

---

## Yapı

```
store_mind/
├── site/                  → CANLIYA GİDEN TEK KLASÖR (storemind.ant-soft.uk)
│   ├── index.html         → landing (TR/EN/NL, gerçek foto + detection overlay)
│   ├── assets/            → 9 gerçek sahne (sec_*, ops_*, sales_*) + image-01
│   ├── demo/index.html    → operasyon paneli demosu (TR/EN/NL, 3D harita/otopark/kamera)
│   └── docs/              → compliance: privacy/security/dpa (her biri index.html + en.md/tr.md kaynak)
├── sql/                   → Supabase şema (01→05 sırayla SQL editöründe çalıştırılır)
├── supabase/functions/    → edge function'lar (Deno/TS)
│   ├── ingest-facemind/   → kaynak-agnostik ingest (x-ingest-secret)
│   └── dashboard-data/    → read-only dashboard JSON (service_role)
├── docs/
│   ├── compliance/        → politika markdown kaynakları (TR/EN)
│   └── SPACEMIND_INTEGRATION_TODO.md → SpaceMind bağlama notu (Aşama 2, beklemede)
└── README.md
```

## Deploy (landing + demo, statik)

```
cd ~/DEV/store_mind/site && npx wrangler pages deploy . --project-name=storemind --branch=production
```

Sonra **incognito** ya da **Cmd+Shift+R** ile `storemind.ant-soft.uk` doğrula (Cloudflare önbelleği için).
Demo statik HTML'dir (`site/demo/index.html`) — Next.js build yok, doğrudan dosya servis edilir.

## Altyapı

- **Cloudflare Pages:** `storemind` → storemind.ant-soft.uk
- **Supabase:** `ulolaujtarzuvhopiktu` (Frankfurt) — RLS açık, anon key bloklu; migration'lar tarayıcı SQL editöründen
- **Stack:** vanilla HTML/JS/CSS (frontend) + Deno/TS (edge). Build pipeline yok — statik, basit, kırılmaz.

## Dil

Landing + demo: **TR / EN / NL** toggle (EN varsayılan landing, TR varsayılan demo; seçim localStorage'da).

## Durum

- ✅ Landing — gerçek foto + detection overlay, 3 kategori (Güvenlik / Saha / Satış), TR/EN/NL, compliance sayfaları
- ✅ Demo — 3D izometrik harita + otopark + son-6-event kanıt kartları, TR/EN/NL
- ⏸️ SpaceMind entegrasyonu — beklemede (önce SpaceMind'da market site_id tanımlanmalı; bkz. docs/SPACEMIND_INTEGRATION_TODO.md)
