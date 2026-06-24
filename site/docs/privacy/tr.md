# StoreMind Gizlilik Politikası

## Temel İlke: "Sizin Orada Olduğunuzu Sadece O Mağaza Bilir"

Müşteri dün saat 14:32'de mağazaya girdi.  
Kamerayla tanındı. Lokal database'e kaydı.

**Kim biliyor?**

- ✓ Mağaza (local device'da, encrypted)
- ❌ StoreMind (hiçbir veri tutmuyoruz)
- ❌ Cloud sağlayıcı (hiçbir API call yok)
- ❌ Analytics şirketi (veri transfer yok)
- ❌ Hacker (bulut yoksa hack edilecek ne var?)
- ❌ Başka hiç kimse

---

## StoreMind = Store Çalışanının Mükemmel Belleği

Hayal edin: Mağazanızda 10 yıldan beri çalışan bir güvenlik görevlisi var.

**Müşteri gelir:**
- Güvenlik: "Seni daha önce görmüştüm. 3 aylar önce, saat 16:00'de geldin."
- Müşteri: "Evet doğru!"

**Soru: Kim biliyor bu bilgiyi?**
- Sadece güvenlik (ve mağaza sahibi)
- Başka kimse değil

Güvenlik görevlisinin:
- ✓ Hatırlaması var
- ✓ Hırsız değil (müşteriyi satar mı?)
- ✓ Tartışmaz (başkasına anlatmaz)

**StoreMind = o güvenlik görevlisinin şifreli veri haline gelmesi**

Ama daha iyi:
- ✓ Hiçbir zaman hataya düşmez
- ✓ Asla unutmaz (ya da sıfırlar)
- ✓ Hiçbir zaman başkasına söylemez (architecture'ı bağlayan)
- ✓ 24/7 çalışır
- ✓ Hiçbir cloud sağlayıcısı yoktur

---

## Cloud Theater vs. Local Architecture

**Cloud Platformu:**
```
Müşteri Mağazada
    ↓
Kamera → Cloud API → Bulut Sunucu → Analytics → Vendor Logs → Hacker?
                ↓
         (Data crosses boundary)
         ↓
    Soru: "GDPR uyumlu musunuz?" 
    Cevap: "Evet, badges var, compliance docs var"
         ↓
    Hakikat: Veri hala riskli, hala çok yerde
```

**StoreMind (Local):**
```
Müşteri Mağazada
    ↓
Kamera → Local GPU → Encrypted Database (Mağazada)
                ↓
    Soru: "GDPR uyumlu musunuz?"
    Cevap: "Uyumlu değiliz, fizikten uyumlu: veri hiç çıkmıyor"
         ↓
    Hakikat: Veri sadece mağazada, şifreli, safe
```

---

## Neden Diğerleri Cloud'da Yapar?

Çünkü **ucuzdur**, kolaydur, hızlı develop edilir.

StoreMind niye **Lokal** yapar?

Çünkü **doğrudur**. Sizin mağazanız = sizin veri sınırı.

Fark:

| Aspect | Cloud Platforms | StoreMind |
|--------|-----------------|-----------|
| **Processing** | Remote servers (vendor's responsibility) | Your hardware (your control) |
| **Security** | Multiple cloud layers, API calls | Local only, no network exposure |
| **Compliance** | Vendor's GDPR compliance + your compliance | Your infrastructure, your responsibility |
| **Speed** | Network latency (300-1000ms) | Local processing (10-50ms) |
| **Cost** | Cloud API bills every month | One-time software license |
| **Ownership** | Vendor controls your data | You own everything |

**Sonuç**: StoreMind sadece uyumlu değil. Mimarı daha iyi.

---

## Veri İşleme Akışı

```
Mağaza Kameraları
    ↓
Lokal Edge Device (GPU/CPU sizde)
    ↓
Yüz Tanıma / Araç Plakası / Raf Saymı (İŞTE BURADA)
    ↓
Lokal Veritabanı (Şifreli)
    ↓
Bitti. Buluta çıkmadı.
```

---

## Bulut Yok. Asla.

StoreMind hiçbir zaman:
- ❌ Video ya da görüntü buluta göndermez
- ❌ Metadata buluta göndermez
- ❌ Cloud API'lerini işleme için çağırmaz
- ❌ Veri analizi bulutta yapmaz
- ❌ Müşteri bilgisini profillemez
- ❌ Başka şirketlerle veri paylaşmaz

Hiç. Asla. Net.

---

## KVKK / GDPR Sorumluluğu

**Bu açık olmalı**: StoreMind veri işler **sizin altyapınızda**.

### StoreMind'ın Rolü (Veri İşleme Hizmetçi)

StoreMind, **yazılım koddur**. Başka hiçbir şey değil.
- Sunucu yönetmiyoruz ✓
- Veri yedeklemiyor ✓
- Veri analiz etmiyor ✓
- Veri saklamıyor ✓

**Sizin veri işleme altyapınızı kontrol ediyorsunuz.**

### Sizin Sorumluluğunuz (Veri Denetleyen)

Mağaza işletecekseniz, siz şunlardan sorumlusunuz:

1. **Biyometrik Veri Rızası** (KVKK Madde 6, GDPR Article 9)
   - Yüz tanıma yapıyorsanız → çalışanlara yazılı izin almalısınız
   - Müşteri tanıması yapıyorsanız → müşteri rızası gerekli
   - **StoreMind bunu yapmıyor. Siz yapmalısınız.**

2. **Uyarı Levhaları**
   - "Bu işyerinde yüz tanıma sistemi vardır"
   - "Bu işyerinde araç plakası tanıması yapılır"
   - Mağaza girişine yapıştırmalısınız

3. **Veri Kişisinin Hakları**
   - Müşteri yüzünü sil: veritabanınızdan silebilmelisiniz
   - Müşteri veri nerede sordu: veritabanınıza bakıp söylemelisiiniz
   - Müşteri ihraç talep etti: JSON dosyasını yaratıp vermelisiiniz

4. **Veri Saklama Politikası**
   - Ne kadar tutuluyor? (30 gün, 90 gün, 1 yıl?)
   - Otomatik silme yapılıyor mu?
   - **Sizin karar.**

5. **Erişim Kontrolü**
   - Kim görüyor? (Müdür, güvenlik, herkes?)
   - Şifre güvenliği var mı?
   - **Sizin sorumluluk.**

6. **İhlal Bildirimi**
   - Veri sızarsa → Gözlemci Kurulu'na 72 saat içinde (KVKK)
   - Gözlemci Kurulu'na bildirmelisiiniz, biz değil

---

## Biyometrik Veri (Yüz Tanıma) — Özel Dikkat

Yüz verisi **en hassas veridir** (GDPR/KVKK'da).

### StoreMind'ın Teknikleri:

- **Yüz Algılama**: "Bu görüntüde insan yüzü var mı?" → işlenir lokal
- **Yüz Özelliği Çıkarması**: "Yüz vektörü nedir?" → lokal
- **Eşleştirme**: "Daha önce gördük mü?" → lokal database'de aranır
- **Sonuç**: matched / maybe / silent (lokal)

### Hiçbir Zaman:

- ❌ Yüz kare (crop) kaydedilmez
- ❌ Ham görüntü kaydedilmez
- ❌ Buluta gitmez
- ❌ 3. taraf ML servisi kullanılmaz

### Sizin Sorumluluğunuz:

```
Yüz tanımak istiyorsan:
↓
Yazılı izin al (çalışan, müşteri)
↓
Uyarı levhası koy
↓
Silme hakkını sağla (veritabanından silebilsin)
↓
Saklama süresi sınırla (30 gün, 90 gün, etc.)
↓
Şifreli tut (StoreMind tarafından sağlanır)
↓
O zaman kullan.
```

---

## Veri Sahibi Hakları

Müşteri veya çalışan sorduysa:

### "Benim verilerim nerde?"
**Cevap**: "Mağazamızın veritabanında, şifreli."

### "Benim verilerimide sil"
**Yapman lazım**: Veritabanınızdan silebilmek gerekir.
- StoreMind, silme özelliğini sağlar
- Siz tıklatırsınız
- Verisi silinir

### "Verilerimden export et"
**Yapman lazım**: 
- Veritabanınızdan CSV/JSON çıkartırsınız
- Müşteriye verirsiniz

### "Kimse görmemeliydim"
**Mağaza müdürü sorumlu**: 
- Erişim kontrolü sizde
- Şifre kimde?
- Kim veritabanına bağlanabiliyor?

---

## StoreMind'ın Garantileri

✓ **Lokal İşleme**: Tüm ML/AI işlemleri cihaz üzerinde  
✓ **Şifreli Depolama**: AES-256, sizin anahtarınız  
✓ **Offline Çalışma**: İnternet kesilse de çalışıyor  
✓ **Veri Kaçış Yok**: Buluta API çağrısı hiçbir zaman  
✓ **Açık Kaynak Seçenekleri**: Kendi kurabilirsiniz  

---

## StoreMind Hiçbir Şey Yapmıyor

Bunu açık konuşmak gerekir:

- StoreMind veri **toplamıyor**
- StoreMind veri **satmıyor**
- StoreMind veri **yedeklemiyor**
- StoreMind veri **analiz etmiyor**
- StoreMind profillemesine **katılmıyor**

**StoreMind = yazılım.**
**Veri = sizin.**

---

## Opsiyonel Bulut Entegrasyonu

Siz **kendi kararınızla** bulut bağlayabilirsiniz:

- Supabase analytics? Bağla, ama **senin seçimin**
- AWS S3 backup? Bağla, **ama senin seçimin**
- Google BigQuery? Bağla, **senin seçimin**

StoreMind bunu **reddetmez, ama zorlama yapmaz.**

Bu durumda:
- StoreMind = yerel işleme (uyumlu)
- Bulut servisi = müşterinin seçimi (müşterinin GDPR sorumluluğu)

---

## Özet: Sorumluluğun Sınırı

| Görev | Kimin? |
|-------|---------|
| Lokal işleme teknolojisi sağlamak | StoreMind ✓ |
| Yüz tanıma rızası almak | **Siz** |
| Uyarı levhasını koymak | **Siz** |
| Veritabanını şifreli tutmak | **Siz** |
| Silme hakkını sağlamak | **Siz** |
| Erişim kontrolü yapmak | **Siz** |
| İhlal bildirmek | **Siz** |
| Veri saklama süresi kararı | **Siz** |

StoreMind sadece **lokal işleme altyapısı sağlar.**

---

## İletişim

Herhangi bir soru?

- **Gizlilik sorunu**: contact@storemind.ai
- **GDPR başvurusu**: gdpr@storemind.ai (müşteri temsilcim vardır)
- **İhlal bildirimi**: security@storemind.ai (hemen araştırıyoruz)

---

**Son Güncelleme**: Haziran 2026  
**Geçerli**: Türkiye (KVKK), AB (GDPR), Global
