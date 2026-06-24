# StoreMind Privacy Policy

## Core Principle: "Your Store Knows You Were Here. Nobody Else."

A customer visited your store yesterday at 2:32 PM.  
The camera recognized them. Data was stored locally.

**Who knows?**

- ✓ Your store (on local device, encrypted)
- ❌ StoreMind (we don't store anything)
- ❌ Cloud provider (no API calls ever)
- ❌ Analytics company (no data transfer)
- ❌ Hacker (no cloud to breach)
- ❌ Anybody else

---

## StoreMind = Your Store's Perfect Memory

Imagine a security guard at your store for 10 years.

**Customer comes in:**
- Guard: "I remember you. You were here 3 months ago at 4 PM."
- Customer: "Yes, that's right!"

**Who knows this information?**
- Only the guard (and store owner)
- Nobody else

That guard has:
- ✓ Memory
- ✓ Integrity (won't sell your info)
- ✓ Discretion (never tells anyone)

**StoreMind = that guard's perfect, encrypted memory**

But better:
- ✓ Never forgets, never makes mistakes
- ✓ Can be deleted on demand
- ✓ Never tells anyone (architecture guarantees it)
- ✓ Works 24/7
- ✓ No cloud provider exists to breach it

---

## Cloud Theater vs. Local Architecture

**Cloud Platform:**
```
Customer in Store
    ↓
Camera → Cloud API → Cloud Server → Analytics → Vendor Logs → Hacker?
           ↓
    (Data crosses boundary)
    ↓
Question: "Are you GDPR compliant?"
Answer: "Yes, we have badges, compliance docs"
    ↓
Reality: Data still at risk, in multiple places
```

**StoreMind (Local):**
```
Customer in Store
    ↓
Camera → Local GPU → Encrypted Database (Your Store)
            ↓
Question: "Are you GDPR compliant?"
Answer: "We don't need badges. Data never leaves."
    ↓
Reality: Data only in your store, encrypted, safe
```

---

## Why Others Use Cloud

Because it's **cheaper**, easier, faster to build.

Why StoreMind Uses Local?

Because it's **the right way**. Your store = your data boundary.

---

## Why This Matters

Other retail platforms process in the cloud because it's **cheaper to build**.  
StoreMind processes locally because it's **the right way to build**.

The difference:

| Aspect | Cloud Platforms | StoreMind |
|--------|-----------------|-----------|
| **Processing** | Remote vendor servers | Your local hardware |
| **Security** | Multiple cloud layers, APIs | Local only, no network exposure |
| **Compliance** | Vendor's GDPR + your compliance | Your infrastructure, your responsibility |
| **Speed** | Network latency (300-1000ms) | Instant local (10-50ms) |
| **Cost** | Monthly cloud API bills | One-time software |
| **Ownership** | Vendor controls access | You own everything |

**Result**: StoreMind isn't just compliant. It's better engineered.

---

## Data Processing Flow

```
Store Cameras
    ↓
Local Edge Device (GPU/CPU on your hardware)
    ↓
Face Recognition / Plate Detection / Shelf Counting (HAPPENS HERE)
    ↓
Local Database (Encrypted)
    ↓
Done. Never left your facility.
```

---

## No Cloud. Ever.

StoreMind never:
- ❌ Sends video or images to the cloud
- ❌ Sends metadata to the cloud
- ❌ Calls cloud APIs for processing
- ❌ Analyzes data remotely
- ❌ Profiles customers
- ❌ Shares data with third parties

Never. Ever. Period.

---

## GDPR / KVKK Responsibility

This must be clear: StoreMind processes data **on your infrastructure**.

### StoreMind's Role (Data Processor)

StoreMind is **software code**. Nothing more.
- We don't manage servers ✓
- We don't back up data ✓
- We don't analyze data ✓
- We don't store data ✓

**You control your data processing infrastructure.**

### Your Responsibility (Data Controller)

If you operate a store, you're responsible for:

1. **Biometric Data Consent** (KVKK Article 6, GDPR Article 9)
   - Using face recognition? → Get written consent from employees/customers
   - Identifying customers? → Customer consent required
   - **StoreMind doesn't do this. You must.**

2. **Privacy Notices**
   - "Face recognition is used in this facility"
   - "Vehicle plate recognition is active"
   - Post at facility entrance

3. **Data Subject Rights**
   - Customer wants face deleted? → You delete from database
   - Customer asks where data is? → You check database, you respond
   - Customer requests export? → You generate CSV, you provide it

4. **Data Retention Policy**
   - How long do you keep it? (30 days, 90 days, 1 year?)
   - Does it auto-delete?
   - **Your decision.**

5. **Access Control**
   - Who can access the database? (Manager, security, everyone?)
   - Password security?
   - **Your responsibility.**

6. **Breach Notification**
   - If data leaks → Report to regulator within 72 hours (GDPR/KVKK)
   - **You notify the regulator. Not us.**

---

## Biometric Data (Face Recognition) — Special Attention

Face data is **the most sensitive** under GDPR/KVKK.

### What StoreMind Does:

- **Face Detection**: "Is there a face in this image?" → processed locally
- **Face Feature Extraction**: "What are the face vectors?" → local
- **Matching**: "Have we seen this face before?" → local database lookup
- **Result**: matched / maybe / silent (all local)

### What StoreMind Never Does:

- ❌ Stores face crops (images)
- ❌ Stores raw footage
- ❌ Sends anything to cloud
- ❌ Uses third-party ML services

### Your Responsibility:

```
Want to use face recognition?
↓
Get written consent (employees, customers)
↓
Post privacy notice
↓
Enable deletion rights (people can be removed from database)
↓
Set retention limit (30 days, 90 days, etc.)
↓
Keep data encrypted (StoreMind provides framework)
↓
Then you can use it.
```

---

## Data Subject Rights

If a customer or employee asks:

### "Where is my data?"
**You respond**: "In our store database, encrypted locally."

### "Delete my data"
**You must**: Delete from your database.
- StoreMind provides deletion tools
- You execute it
- Data is gone

### "Export my data"
**You must**:
- Export from your database (CSV/JSON)
- Provide to the person

### "I shouldn't have been tracked"
**You're responsible**:
- Access control is yours
- Password management is yours
- Who can access the database is yours

---

## StoreMind's Guarantees

✓ **Local Processing Only**: All ML/AI runs on your hardware  
✓ **Encrypted Storage**: AES-256, your keys  
✓ **Offline Capable**: Works without internet  
✓ **Zero Data Leakage**: No cloud API calls ever  
✓ **Open Source Options**: Deploy yourself if you want  

---

## What StoreMind Does NOT Do

This needs to be explicit:

- StoreMind does NOT collect data
- StoreMind does NOT sell data
- StoreMind does NOT back up data
- StoreMind does NOT analyze data
- StoreMind does NOT profile people

**StoreMind = software.**
**Data = yours.**

---

## Optional Cloud Integration

You can **choose** to connect cloud services:

- Want Supabase analytics? Connect it. **Your choice.**
- Want AWS S3 backup? Connect it. **Your choice.**
- Want BigQuery analysis? Connect it. **Your choice.**

StoreMind doesn't **prevent** cloud integration, but it doesn't **force** it either.

If you do connect cloud:
- StoreMind = local processing (compliant)
- Your cloud choice = your GDPR responsibility

---

## Responsibility Boundary

| Task | Who? |
|------|------|
| Provide local processing technology | StoreMind ✓ |
| Obtain face recognition consent | **You** |
| Post privacy notices | **You** |
| Keep database encrypted | **You** |
| Enable deletion rights | **You** |
| Control database access | **You** |
| Report breaches | **You** |
| Define data retention | **You** |

StoreMind only provides **local processing infrastructure**.

---

## Contact

Questions?

- **Privacy concern**: contact@storemind.ai
- **GDPR request**: gdpr@storemind.ai (we have a DPA)
- **Security incident**: security@storemind.ai (we respond immediately)

---

**Last Updated**: June 2026  
**Valid For**: EU (GDPR), Turkey (KVKK), Global
