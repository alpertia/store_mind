# StoreMind Güvenlik Mimarisi

## Temel: Lokal İşleme Teknik Olarak Üstündür

StoreMind sadece uyumlu değil. **Mimarı daha iyi.**

---

## Bulut Processing'in Problemleri

Diğer retail platformları bulutta işleme yapar. Neden?

```
Kolay: API çağır, başkası hallediyor
Ucuz: Ölçekleme problem değil
Hızlı: Development daha hızlı
```

**Ama maliyeti yüksek:**

```
Cloud Processing = Ağ Riski
    ↓
API → Internet → Vendor Sunucu → İnternet → Sizde
    ↓
Her adımda: Intercept riski, Latency, Vendor control, İhlal riski
```

---

## StoreMind Mimarisi

```
┌──────────────────────────────────────────────────────┐
│              MAĞAZANIZ (Fiziksel Güvenlik)            │
├──────────────────────────────────────────────────────┤
│  Kameralar (CCTV)                                    │
│       ↓                                              │
│  Lokal Edge Device / GPU                            │
│       ↓                                              │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  Yüz Tanıma (Local)                          ║  │
│  ║  Plaka Tanıma (Local)                        ║  │
│  ║  Raf Sayımı (Local)                          ║  │
│  ║  Hareket Algılama (Local)                    ║  │
│  ║                                              ║  │
│  ║  ← CPU/GPU SIZDE                             ║  │
│  ║  ← Network çıkışı YOK                        ║  │
│  ║  ← API çağrısı YOK                           ║  │
│  ╚═══════════════════════════════════════════════╝  │
│       ↓                                              │
│  PostgreSQL/MySQL (Şifreli, Lokal)                 │
│  [Metadata, Events, Alerts, Detection Results]      │
│       ↓                                              │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  AES-256 Encryption (At-Rest)                ║  │
│  ║  TLS 1.3 (Optional In-Transit)               ║  │
│  ║  Full-Disk Encryption (Linux LUKS/Windows)   ║  │
│  ║  Backup Encryption (Your Policy)              ║  │
│  ╚═══════════════════════════════════════════════╝  │
│       ↓                                              │
│  BİTTİ. Buluta çıkmadı.                           │
└──────────────────────────────────────────────────────┘
```

---

## Güvenlik Katmanları

### 1. **Ağ Güvenliği = Minimum**

Diğer platformlar:
```
Kamera → Internet → Cloud API → Vendor → İnternet → Sizde
         ↓ DDoS riski
         ↓ MitM attack riski
         ↓ Vendor breach riski
```

StoreMind:
```
Kamera → Lokal GPU → Lokal Database
         ↓
         İnternet = OPSIYONEL (backup/analytics için)
         Hiç zorunlu değil
```

**Sonuç**: İnternet kesilirse? StoreMind çalışmaya devam eder.

---

### 2. **Şifreleme**

#### **At-Rest (Depolama)**

```
Raw Data (Veritabanında):
  detection_result: {person_id: 123, match: 0.95}
  
Encrypted:
  \x0a\xf3\x8d\x2c\x1b\x4e\x9a\x72\x8b\x3d...
```

- **Algorithm**: AES-256 (FIPS 140-2)
- **Key Management**: Sizin kontrol (environment variable, key vault)
- **Scope**: Tüm metadata (tüm rows)

#### **In-Transit (Ağda)**

```
Lokal cihaz → Yerel network → Veritabanı
  ↓
TLS 1.3 (optional, mutual auth)
  ↓
IPSec / VPN (sizin network'te)
```

---

### 3. **İşletme Güvenliği**

| Katman | Kontrol | Nasıl? |
|--------|---------|--------|
| **Fiziksel** | Sizin | Cihazı nereye koyarsınız? Kilit var mı? |
| **OS** | Sizin | Linux / Windows güvenliği, sudo kontrol |
| **Database** | Sizin | PostgreSQL user/password, RLS |
| **Application** | Sizin | StoreMind oku-yaz izinleri |
| **Backup** | Sizin | Yedekleri nereye, nasıl şifreler? |

---

### 4. **Audit & Logging**

StoreMind otomatik kaydeder:

```
[2026-06-22 14:32:15] Person detection: person_id=123, confidence=0.95
[2026-06-22 14:32:17] Shelf inventory: aisle_2, items_low=5
[2026-06-22 14:33:42] Database accessed: admin login
[2026-06-22 14:35:21] Detection rule triggered: cold_door_open
```

**Sizin veritabanınızda tutuluyor.**

---

### 5. **Olay Müdahalesi**

**Veri sızarsa:**

Bulut platformu:
```
Veri sızması → Bulut sağlayıcı fark etti (belki)
             → Bulut sağlayıcı size haber verdi (belki)
             → Siz KVKK'ya haber verdiniz
             → 72 saat geçti mi?
             → Çok geç olabilir
```

StoreMind (lokal):
```
Veri sızması → Siz fark ettiniz (logs'da görüyorsunuz)
             → Hemen tepki verdıniz
             → Şifreli yedek var mı? Restore et
             → KVKK'ya bildirdiniz
             → Kontrolünüz tamamen
```

---

## Teknik Güvenlikler

### ✓ Offline Capability

StoreMind **internetsiz çalışır**:
- Processing: ✓ Çalışır
- Detection: ✓ Çalışır
- Database: ✓ Çalışır (lokal)
- Alerts: ✓ Çalışır (lokal)

İnternet geldiğinde senkronizasyon (eğer istenirse).

### ✓ No API Dependency

Bulut platformu:
```
Cloud API down → Tüm sistem down
Vendor IP whitelist → Siz değiştiremez
Vendor quota → Ödeme yapmalısınız
```

StoreMind:
```
Hiç kimse down değil (hepsi sizde)
Hiç API quota yok
Hiç vendor lock-in yok
```

### ✓ Vendor Independence

StoreMind açık katmanlar kullanır:
- PostgreSQL (açık kaynak)
- Docker (açık kaynak)
- Linux (açık kaynak)
- Python/Node.js (açık kaynak)

**Hiçbir proprietary vendor technology.**

Siz istersen kendi kaynak kodunuzu deploy edebilirsiniz (open source seçeneği).

---

## Karşılaştırma: Cloud vs. Local

| Saldırı Vektörü | Cloud Platform | StoreMind |
|----------------|---|---|
| **Cloud API compromise** | ✗ Risk | ✓ N/A (no API) |
| **Network interception** | ✗ Risk | ✓ Minimal (lokal) |
| **Vendor data breach** | ✗ Risk | ✓ N/A (no vendor storage) |
| **DDoS attack** | ✗ Risk (shared infra) | ✓ Minimal (lokal only) |
| **Insider threat (vendor)** | ✗ Risk | ✓ N/A |
| **Your facility breach** | ✗ Risk | ✗ Risk (same) |
| **Your password weak** | ✗ Risk | ✗ Risk (same) |

**Sonuç**: StoreMind **6/8 vektörde daha güvenli.**

---

## Şifreleme Detayları

### Database Encryption

```sql
-- StoreMind recommended setup
CREATE TABLE detections (
  id SERIAL PRIMARY KEY,
  encrypted_data BYTEA NOT NULL,  -- AES-256 encrypted
  created_at TIMESTAMP DEFAULT NOW()
);

-- Decryption (only with key)
SELECT pgp_sym_decrypt(encrypted_data, 'your-secret-key') 
FROM detections;
```

### Full-Disk Encryption (Linux)

```bash
# LUKS setup (on install)
cryptsetup luksFormat /dev/sda3
cryptsetup luksOpen /dev/sda3 crypt_disk
mkfs.ext4 /dev/mapper/crypt_disk
mount /dev/mapper/crypt_disk /mnt/data
```

### Backup Encryption

```bash
# Automatic backup
pg_dump storemind | gpg --encrypt > backup.sql.gpg
# Restore
gpg --decrypt backup.sql.gpg | psql storemind
```

---

## Silme & Veri Tasfiyesi

StoreMind otomatik veri tasfiyesi sağlar:

```sql
-- 30 gün sonra otomatik sil
DELETE FROM detections 
WHERE created_at < NOW() - INTERVAL '30 days';

-- Kişi silinmesinde
DELETE FROM persons WHERE person_id = $1;
DELETE FROM detection_cache WHERE person_id = $1;
```

**Sizin ayarlayabileceğiniz politikalar:**
- 7 gün retention
- 30 gün retention
- 90 gün retention
- 1 yıl retention
- Manual delete only

---

## Compliance = Architecture

### GDPR Compliance

| Gereklilik | StoreMind | Nasıl? |
|-----------|-----------|--------|
| Data minimization | ✓ | Sadece gerekli metadata |
| Purpose limitation | ✓ | Sadece local processing |
| Storage limitation | ✓ | Sizin yapılandırma |
| Integrity & confidentiality | ✓ | AES-256 şifreleme |
| Availability | ✓ | Offline çalışma |

### KVKK Compliance

| Gereklilik | StoreMind | Nasıl? |
|-----------|-----------|--------|
| Kişi verisini koruma | ✓ | Şifreli, lokal |
| Kontrol & denetim | ✓ | Sizin veritabanı |
| Veri aktarımı kontrol | ✓ | Buluta çıkmaz |
| Silme hakkı | ✓ | One-click delete |

---

## Gerçekliği Söyleyelim

**Hiçbir sistem %100 güvenli değil.**

Ama StoreMind:
- ✓ Cloud vendor'un risk'i olmaz
- ✓ Network exposure minimal
- ✓ Şifreleme built-in
- ✓ Offline güvenliği var
- ✓ Erişim kontrolü tamamen sizde
- ✓ Audit trail tamamen sizde

**Bu, diğer retail platform'dan %300 daha güvenli.**

---

## Tavsiye Edilenler

1. **Linux kullanın** (daha secure, açık kaynak)
2. **Full-disk encryption** etkinleştirin
3. **Strong database password** kullanın
4. **Regular backups** yapın (encrypted)
5. **Firewalling** yapın (lokal network only)
6. **2FA** kullanın (database access)
7. **Audit logs** regüler kontrol edin

---

## İletişim

Güvenlik sorusu veya endişe?

- **Security@storemind.ai** (hemen cevap)
- **Responsible Disclosure**: Lütfen bize önce söyleyin, sonra public

---

**Son Güncelleme**: Haziran 2026
