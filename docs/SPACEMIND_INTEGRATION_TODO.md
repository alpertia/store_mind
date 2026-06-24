# StoreMind ← SpaceMind Entegrasyonu — Beklemede (Aşama 2)

StoreMind tüketici (Seviye A, read-only). SpaceMind'dan **konum** okur, **event** okumaz.
Demo 3D haritası bugün sentetik; SpaceMind market verisi hazır olunca canlıya döner.

## Önkoşul (SpaceMind tarafında — kullanıcı)
1. Market için ayrı `site_id` tanımla (ör. `storemind-pilot`). Restoran = `tahtasaray`, market AYRI olmalı.
2. Multi-site read'i DOĞRULAT (CONTRACTS §12 #3 açık kalem) — yoksa StoreMind tahtasaray verisini çeker.
3. Market mekanlarını gir: reyonlar, kasa, soğuk oda, depo, yükleme rampası (spaces).
4. Kamera duruşlarını `calib_ok=true` ile doğrula (false olanların x/y çöp, gösterilmez).

## StoreMind tarafı (hazır olunca — tek config + aktivasyon)
Okunacak endpoint'ler (anon/read-only):
- `GET /v1/plan/snapshot` → boot'ta TEK çağrı, RAM cache (spaces + cameras/spatial)
- (runtime'da SpaceMind'ı tekrar çağırma; plan değişirse /plan/reload webhook)

Çekirdek alanlar: `origin_x_m, origin_y_m, w, l, rotation, name` (spaces) ·
`x_m, y_m, pan, fov, calib_ok` (cameras/spatial). Koordinat: lokal kartezyen METRE, 2D, site origin'e göre. GPS/z yok.

Config (hardcode DEĞİL — .env):
- `SPACEMIND_BASE_URL` (URL + port — henüz yok)
- `SPACEMIND_SERVICE_ROLE_KEY`
- `SPACEMIND_SITE_ID` (market site)

Davranış:
- `calib_ok=false` → o kamerayı gösterme.
- Site verisi yok / DB down / fetch fail → **sentetik haritaya fallback** (mock mode, pilot-safe). Showcase hep güçlü kalır.
- Drift bilinci: bazı space origin'leri saha-teyitli değil; geldiği gibi çiz ama "taslak" kabul et.

## Sınır (dokunma)
SpaceMind'dan ALINMAZ: raf doluluk, yerde kutu, plaka, occupancy, cam_live, event.
Bunlar CamMind/PlateMind/perception lane. StoreMind SpaceMind'a YAZMAZ.

## Aktivasyon (StoreMind kodu hazır olunca)
`fetchPlan()` → snapshot çek → `calib_ok` filtrele → spaces'i ISO zemine, kameraları haritaya map'le →
veri varsa sentetik yerine gerçek çiz, yoksa sentetik kal.
