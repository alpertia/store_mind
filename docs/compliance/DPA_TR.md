# Veri İşleme Sözleşmesi (DPA)
## StoreMind

**Yürürlük Tarihi**: Haziran 2026  
**Geçerliliği**: GDPR (AB), KVKK (Türkiye), Global

---

## 1. Tanımlar

**StoreMind** ("Processor" / "İşleyici"):
- Yazılım sağlayıcı, lokal processing platform'u sağlar
- Sunucu işletmiyor, veri depolamıyor, bulut hizmeti vermiyor

**Müşteri** ("Controller" / "Denetleyen"):
- StoreMind'ı kullanan şirket (mağaza, market, perakende)
- Veri işleme kararını veren taraf
- Yasal sorumluluğu taşıyan taraf

**Kişisel Veri** ("Personal Data"):
- Yüz özellikleri (face vectors)
- Deteksiyon sonuçları (person_id, confidence scores)
- Araç plakası bilgisi
- İş logları (timestamp, location, event)

**İşleme** ("Processing"):
- Yüz algılama, matching, eşleştirme
- Metadata oluşturması
- Lokal veritabanı yazma
- Şifreleme, silme

---

## 2. Tarafların Rolleri

### 2.1 StoreMind (Veri İşleyici)

StoreMind sadece şu yapıyor:

✓ Lokal processing framework sağlar  
✓ Şifreleme altyapısı sunar  
✓ Silme & audit mekanizmaları sağlar  
✓ Teknik dokumentasyon verir  

StoreMind **şunu yapmıyor:**

❌ Veri saklamaz (cloud'da)  
❌ Veri toplamazv (telemetry)  
❌ Veri analiz etmez (vendor analitiği)  
❌ Veri satmaz  
❌ Veri paylaşmaz  
❌ Veri yedeklemez  
❌ Veri transfer etmez  

### 2.2 Müşteri (Veri Denetleyeni)

Müşteri sorumluluk taşıyor:

✓ Kararı veriyor (hangi kamera, hangi algorithm)  
✓ Rızayı alıyor (çalışan, müşteri onayı)  
✓ Veritabanını yönetiyor (backup, restore, şifre)  
✓ Erişim kontrolü yapıyor (kim görebilir)  
✓ Silme işlemi yapıyor (istek gelince silebiliyor)  
✓ GDPR/KVKK bildirimi yapıyor (72 saat)  
✓ DPO atama yapıyor (gerekiyorsa)  
✓ Güvenlik denetimi yapıyor  

---

## 3. Veri İşleme Kapsamı

### 3.1 İşlenen Veriler

| Veri Türü | Nerede | Kimlerin |
|-----------|--------|---------|
| **Yüz Özellikleri** | Lokal GPU/cihaz | Geçici (RAM) |
| **Detection Results** | Lokal database | Daimi (encrypted) |
| **Metadata** | Lokal database | Daimi (encrypted) |
| **Event Logs** | Lokal database | Daimi (encrypted) |
| **Person Master List** | Lokal database | Daimi (encrypted) |

### 3.2 İşleme Yöntemi

**Hiçbir zaman:**
- ❌ İnternet üzerinden gönderilmez
- ❌ Bulut API'sine verilmez
- ❌ 3. taraf servisi kullanılmaz
- ❌ Vendor sunucularına depolanmaz

**Her zaman:**
- ✓ Lokal işleme
- ✓ Lokal storage (encrypted)
- ✓ Offline capability
- ✓ Müşteri control

### 3.3 İşleme Süresi

**Tanımsız** — müşteri siler veya "retention policy"'de yazılı süre.

Varsayılan:
- 30 gün otomatik silme (ayarlanabilir)
- Manuel silme (müşteri talep eder)

---

## 4. StoreMind'ın Garantileri

### 4.1 Teknik Garantiler

✓ **Lokal Processing**: Tüm ML/AI = sizin cihazda  
✓ **Şifreli Storage**: AES-256 (FIPS 140-2)  
✓ **No API Calls**: Bulut dependency yok  
✓ **Offline Capable**: İnternet kesilse çalışır  
✓ **Audit Logs**: İşleme kayıtları saklanır  
✓ **Deletion Capable**: Verileri siler/export'lar  
✓ **Open Framework**: Açık kaynak components  

### 4.2 Operasyon Garantileri

StoreMind aşağıdakileri sağlar:

✓ Düzenli Security Updates (if applicable)  
✓ Documentation & Training  
✓ Technical Support (for processing framework)  
✓ Audit Trail Mechanisms  

---

## 5. Müşterinin Yükümlülükleri

### 5.1 Yasal Uyumluluk

Müşteri garanti eder:

```
1. "Kişisel verileri işlemek için yasal zemine sahibim"
   → Rıza belgesi, yasal dayanak, işletme sahibi hakkı
   
2. "Bilgilendirilmiş rıza aldım veya yasalar kapsamındayım"
   → İşyeri CCTV = hakkı var, ama yüz tanıma = rıza gerekli
   
3. "Veri sahibilerine bilgi verdim"
   → Privacy notice gösterdim, uyarı levhası koydım
   
4. "Veri tasfiyesi ve saklama politikam var"
   → Ne kadar tutuluyor, kim görüyor, nasıl silinir
```

### 5.2 Teknik Uyumluğu

Müşteri sorumluluk taşıyor:

```
1. Şifreleme anahtarını güvenli tutar
   → Storage'da, environment var'da, keysafe'de
   
2. Veritabanı şifresini güvenli tutar
   → Strong password, 2FA, regular rotation
   
3. Erişim kontrolü yapar
   → Kim lokal database'e bağlanabiliyor?
   
4. Backups'ı şifreli tutarv
   → Yedekler de şifreli olmalı
   
5. Full-disk encryption'ı etkinleştirir
   → Linux LUKS, Windows BitLocker, etc.
```

### 5.3 İhlal Halinde Tepki

Müşteri şunları yapmalı:

```
Veri Sızması / Breach:
  ↓
1. Hemen tespit et (audit logs'ta görüyorsun)
  ↓
2. Hemen kontrol et (ne kadar veri sızmasını?)
  ↓
3. Hemen tepki ver (sistem restart, erişim kapat)
  ↓
4. 72 saat içinde KVKK'ya / Regülatore bildır
  ↓
5. Veri sahiplerine haber ver (gerekiyorsa)
  ↓
6. Soruşturma başlat (lokal, StoreMind'a değil)

NOT: StoreMind'ın hiçbir yükümlülüğü yok (veri tutmadığı için)
```

---

## 6. Sorumluluk Sınırları

### 6.1 StoreMind Sorumlu DEĞİLDİR

StoreMind sorumlu olmadığı durumlar:

❌ Müşteri yazılı rıza almadığı halde yüz tanıma yaptığı  
❌ Müşteri veritabanı şifresini kaybettiği  
❌ Müşteri backup'ı şifreli yapmadığı  
❌ Müşteri cihazı fiziksel olarak çaldığı  
❌ Müşteri access control'ü doğru yapmaması  
❌ Müşteri silme talebini yönetememesi  
❌ Müşteri GDPR/KVKK bildirimi yapmaması  
❌ Müşteri regülasyon kontrol defteri tutmaması  

**Sonuç**: StoreMind hiçbir yasal risk taşımaz (lokal processing sayesinde)

### 6.2 Müşteri Sorumlu

Müşteri sorumlu:

✓ Tüm yasal uyumluluğu (GDPR/KVKK)  
✓ Tüm teknik güvenliği (cihaz, database, şifre)  
✓ Tüm erişim kontrolü (kim görebilir)  
✓ Tüm veri tasfiyesi (silme, retention)  
✓ Tüm incident response (breach, bildiriler)  
✓ Tüm audit trail (logları tutma)  

---

## 7. Veri Taşıyıcı Anlaşması

### 7.1 Veri Transferi

StoreMind:
- ❌ Hiçbir zaman veri transfer etmez (cloud'a)
- ✓ Müşteri isterse veri export'ları (CSV/JSON)
- ✓ Müşteri isterse cloud'a gönderebilir (kendi sorumluluğu)

### 7.2 Opsiyonel Bulut Entegrasyonu

Eğer müşteri cloud bağlarsa (Supabase, AWS, etc.):

**StoreMind'ın yapacağı:**
- Veri export mekanizması sağlar
- Entegrasyon dokümantasyonu sağlar

**Müşterinin yapacağı:**
- Cloud servisi seçer
- Cloud servisle kendi DPA yapar (StoreMind değil)
- Cloud servisten taahhüt alır

**StoreMind sorumluluğu: SIFIR**

---

## 8. Siber Güvenlik

### 8.1 StoreMind'ın Kontrolleri

StoreMind framework sağlar:

✓ Şifreleme (AES-256)  
✓ Audit logging  
✓ Offline operation  
✓ No external API  
✓ Deletion mechanisms  

### 8.2 Müşterinin Kontrolleri

Müşteri implement eder:

✓ Full-disk encryption  
✓ Network segmentation  
✓ Access logging  
✓ Intrusion detection  
✓ Firewall rules  
✓ Regular updates  

---

## 9. Uyumluğu İzleme

### 9.1 StoreMind Tarafında

StoreMind şunu **yapmaz**:
- Müşteri veritabanını denetlemez
- Müşteri erişim kontrolünü kontrol etmez
- Müşteri compliance'ını auditlemiez
- Müşteri loglarını toplamasına

StoreMind şunu **yapabilir**:
- Teknik destek vermek
- Uyumluluk checklist'i sağlamak
- Best practice rehberi vermek

### 9.2 Müşteri Tarafında

Müşteri sorumlu:

✓ Reguler internal audit (GDPR/KVKK)  
✓ Penetration testing (emziyetik)  
✓ Access control review (3 ayda 1)  
✓ Incident response plan (yazılı)  
✓ Staff training (yılda 1)  

---

## 10. Sorumluluk & Tazminat

### 10.1 Sınırlı Sorumluluk

StoreMind **hiçbir sebeple sorumlu değil:**

```
1. Müşteri veri işlemeyi kötüye kullanması
2. Müşteri yasal rıza almayı unutması
3. Müşteri şifreleme anahtarını kaybetmesi
4. Müşteri cihaz güvenliğini ihmal etmesi
5. Müşteri GDPR/KVKK bildirimi yapmaması
6. Müşteri DPO atamaması
7. Müşteri incident response'ı yönetememesi
```

**Neden?** StoreMind veri tutmadığı için, sorumluluk yoktur.

### 10.2 İstisnalar

StoreMind sorumlu OLUR (nadir):

```
SADECE eğer:
- StoreMind yazılımı intentionally veri buluta gönderirse
- StoreMind intentionally telemetry toplayıp veri satarsa
- StoreMind intentional backdoor açarsa
- StoreMind intentional encryption keyi çalması

(Bunlar hiçbir zaman olmayacak, code review'de gözüktüğü için)
```

---

## 11. İmlai & Fesih

### 11.1 DPA Geçerliliği

Bu DPA:
- StoreMind'ı kullanmaya başladığında yürürlüğe girer
- StoreMind'ı kullanmayı bırakıncaya kadar devam eder
- Başka yazılı anlaşma yoksa bu geçerlidir

### 11.2 Sona Erme

Müşteri StoreMind'ı kullanmayı bırakınca:

```
1. Tüm veri müşteriye ait (CSV, JSON export)
2. StoreMind veri tutmaz (hiç tutmadı)
3. Müşteri veriyi silebilir / transfer edebilir
4. DPA otomatik fesih olur
```

---

## 12. Ek Sorumluluklar

### 12.1 Kişi Hakları

**Erişim Talep (Subject Access Request)**

```
Kişi: "Benim verilerim neler?"
Müşteri: Veritabanından query → export et → ver
StoreMind: Destek sağlar (teknik rehberlik)
```

**Silme Talep (Right to Erasure)**

```
Kişi: "Sil beni"
Müşteri: Veritabanından DELETE → execute → doğrula
StoreMind: Deletion tool'ları sağlar
```

**İhraz Talep (Data Portability)**

```
Kişi: "Verilerimde export et"
Müşteri: CSV/JSON export → Müşteriye ver
StoreMind: Export mekanizmaları sağlar
```

### 12.2 Düzeltme Talep (Rectification)

```
Kişi: "Verilerim yanlış"
Müşteri: Veritabanında update yapabilir
StoreMind: Audit trail'de görünür (ki değişiklik takip edilsin)
```

---

## 13. İmza & Kabul

Bu DPA'yı kullanarak StoreMind yazılımını indiren veya kullanan müşteri:

```
☑ Tüm yükümlülükleri anlamıştır
☑ Tüm sorumluluğu kabul etmiştir
☑ GDPR/KVKK uyumluluğu kendisinin olduğunu anlamıştır
☑ StoreMind'ın hiçbir veri tutmadığını anlamıştır
☑ Teknik desteği talep edebileceğini anlamıştır
```

---

## 14. İletişim

DPA hakkında soru?

- **dpa@storemind.ai**
- **legal@storemind.ai**
- **compliance@storemind.ai**

---

**Son Güncelleme**: Haziran 2026  
**Versiyon**: 1.0  
**Status**: Yürürlükte
