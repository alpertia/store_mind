# StoreMind ← SpaceMind Entegrasyonu — BEKLEMEDE (Aşama 2)

StoreMind tüketici (Seviye A, **read-only** — salt okuyucu, plan'a YAZMAZ).
SpaceMind'dan **konum** okur (ne nerede), **event** okumaz. Demo 3D haritası bugün
sentetik; SpaceMind market verisi hazır + kalıcı adres olunca canlıya döner.

## NEREDE KALDIK (26 Haz 2026)
- SpaceMind API kodu HAZIR (commit 02b5f80). `/v1/plan/snapshot` çalışıyor, calib_ok computed.
- Test edildi: `localhost:8100` — ama bu GEÇİCİ (her oturum yeniden başlatma gerekiyor, kırılgan).
- Market verisi BOŞ: `{"site_id":"market","spaces":[],"tables":[],"cameras":[]}` → SQL apply yapılmadı.
- KARAR: localhost'ta uğraşmak yerine, SpaceMind **Fly.io'ya deploy** olunca (sabit URL) dönülecek.

## DÖNÜNCE GEREKEN (sırayla)
1. **SpaceMind kalıcı adres** — Fly.io deploy (Pending #4). localhost:8100 yerine sabit https URL.
2. **Market SQL apply** (Alper, SpaceMind tarafı) — `migrate_market_apply` (market 29 space / 39? / 25 cam).
   Bu yapılmadan `?site_id=market` boş döner.
3. **Gerçek snapshot JSON** — apply sonrası `GET /v1/plan/snapshot?site_id=market` çıktısını al,
   şemayı (alan adları) doğrula. (tahtasaray dolu örnek de iş görür, sadece şema için.)
4. **Market kamera ölçümü** — kameralar `seed` ise calib_ok=false → haritada GÖRÜNMEZ.
   `measured/surveyed/gps_verified/field_audit` olunca görünür. Ölçüm = saha işi.
5. **StoreMind fetchPlan() + /plan sayfası** — Claude yazacak (gerçek JSON gelince, bir kerede doğru).

## calib_ok POLİTİKASI (SpaceMind'dan, net)
- `seed` = false (güvenilmez, başlangıç/tahmini veri) → GÖSTERME
- `measured | surveyed | gps_verified | field_audit` = true → göster

## API ŞEMASI (bilinen)
`GET /v1/plan/snapshot?site_id=<id>` →
`{ site_id, spaces:[...], tables:[...], cameras:[...] }`
Space alanları: origin_x_m, origin_y_m, width_m, length_m, name, (rotation?)
Camera alanları: x_m, y_m, (pan?, fov?), calib_ok (computed, API'de inject ediliyor)
Koordinat: lokal kartezyen METRE, 2D, site origin'e göre. GPS/z yok.

## StoreMind /plan TASARIMI (yazılınca)
- Statik HTML (site/plan/index.html) — Next.js DEĞİL, vanilla JS (stack tutarlı).
- SALT-OKUNUR görüntüleyici — editör DEĞİL (CooksMind'ın FloorPlanClient editördü, o lane StoreMind'da yok).
- SpaceMind'dan market planını çek → spaces'i izometrik zemine, calib_ok=true kameraları haritaya çiz.
- Veri yok / boş / seed / API down → SENTETİK FALLBACK (demo hep güçlü kalır). "Mock mode safe".
- Mekan etiketleri: market (reyon/kasa/soğuk oda/depo), restoran (masa) DEĞİL.
- Config (.env, hardcode değil): SPACEMIND_BASE_URL, SPACEMIND_SERVICE_ROLE_KEY, SPACEMIND_SITE_ID=market

## SINIR (dokunma)
SpaceMind'dan ALINMAZ: raf doluluk, yerde kutu, plaka, occupancy, cam_live, event.
Bunlar CamMind/PlateMind/perception lane. StoreMind SpaceMind'a YAZMAZ.

## NOT
- CooksMind'da da SpaceMind okuma kodu YOK ("SPACEMIND_URL: Step 2 — kod henüz yok").
  Yani kopyalanacak çalışan entegrasyon yok; StoreMind ilk doğru implementasyonu yazacak.
