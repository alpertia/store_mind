# Data Processing Agreement (DPA)
## StoreMind

**Effective Date**: June 2026  
**Jurisdiction**: GDPR (EU), KVKK (Turkey), Global

---

## 1. Definitions

**StoreMind** ("Processor"):
- Software provider, supplies local processing platform
- Does NOT operate servers, store data, or provide cloud services

**Customer** ("Controller"):
- Company using StoreMind (retail store, market)
- Makes data processing decisions
- Bears full legal responsibility

**Personal Data**:
- Face features (face vectors)
- Detection results (person_id, confidence scores)
- Vehicle plate information
- Event logs (timestamp, location, event)

**Processing**:
- Face detection, matching
- Metadata creation
- Local database writing
- Encryption, deletion

---

## 2. Parties' Roles

### 2.1 StoreMind (Processor)

StoreMind **does only**:

✓ Supplies local processing framework  
✓ Provides encryption infrastructure  
✓ Supplies deletion & audit mechanisms  
✓ Provides technical documentation  

StoreMind **does NOT do**:

❌ Store data (cloud)  
❌ Collect telemetry  
❌ Analyze data (vendor analytics)  
❌ Sell data  
❌ Share data  
❌ Back up data  
❌ Transfer data  

### 2.2 Customer (Controller)

Customer bears responsibility:

✓ Makes processing decisions (which cameras, algorithms)  
✓ Obtains consent (employee, customer approval)  
✓ Manages database (backup, restore, password)  
✓ Controls access (who can view)  
✓ Executes deletion (on request)  
✓ Reports breaches (72 hours to regulator)  
✓ Appoints DPO (if required)  
✓ Conducts security audits  

---

## 3. Scope of Data Processing

### 3.1 Data Types Processed

| Data Type | Location | Duration |
|-----------|----------|----------|
| **Face Features** | Local device | Temporary (RAM) |
| **Detection Results** | Local database | Permanent (encrypted) |
| **Metadata** | Local database | Permanent (encrypted) |
| **Event Logs** | Local database | Permanent (encrypted) |
| **Person Master List** | Local database | Permanent (encrypted) |

### 3.2 Processing Method

**Never:**
- ❌ Transferred via internet
- ❌ Sent to cloud API
- ❌ Uses third-party service
- ❌ Stored on vendor servers

**Always:**
- ✓ Local processing
- ✓ Local encrypted storage
- ✓ Offline capable
- ✓ Customer controlled

### 3.3 Processing Duration

**Undefined** — Customer deletes OR per "retention policy" in contract.

Default:
- 30-day auto-delete (configurable)
- Manual delete on request

---

## 4. StoreMind's Guarantees

### 4.1 Technical Guarantees

✓ **Local Processing**: All ML/AI on your device  
✓ **Encrypted Storage**: AES-256 (FIPS 140-2)  
✓ **No API Calls**: No cloud dependency  
✓ **Offline Operation**: Works without internet  
✓ **Audit Logs**: Processing trails maintained  
✓ **Deletion Capable**: Data can be deleted/exported  
✓ **Open Framework**: Open source components  

### 4.2 Operational Guarantees

StoreMind provides:

✓ Regular security updates (if applicable)  
✓ Documentation & training  
✓ Technical support (for processing framework)  
✓ Audit trail mechanisms  

---

## 5. Customer Obligations

### 5.1 Legal Compliance

Customer guarantees:

```
1. "I have legal basis to process this personal data"
   → Consent document, legal authority, or ownership right
   
2. "I obtained informed consent OR I'm within legal scope"
   → Workplace CCTV = right to process, but face recognition = separate consent
   
3. "I informed data subjects"
   → Posted privacy notice, installed warning sign
   
4. "I have data retention & deletion policy"
   → How long kept, who accesses, how deleted
```

### 5.2 Technical Compliance

Customer responsible for:

```
1. Protect encryption keys
   → Environment variable, key vault, secure storage
   
2. Protect database password
   → Strong password, 2FA, regular rotation
   
3. Implement access control
   → Who can access the local database?
   
4. Encrypt backups
   → Backups must also be encrypted
   
5. Enable full-disk encryption
   → Linux LUKS, Windows BitLocker, etc.
```

### 5.3 Breach Response

Customer must:

```
Data Breach / Leak:
  ↓
1. Detect immediately (audit logs show it)
  ↓
2. Assess impact (how much data leaked?)
  ↓
3. Respond immediately (shut down, restore)
  ↓
4. Notify regulator within 72 hours (KVKK / GDPR)
  ↓
5. Notify affected parties (if required)
  ↓
6. Investigate locally (not StoreMind's responsibility)

Note: StoreMind has zero obligation 
(we never stored or transferred data)
```

---

## 6. Limitation of Liability

### 6.1 StoreMind NOT Liable For

❌ Customer obtained no written consent before using face recognition  
❌ Customer lost database password  
❌ Customer didn't encrypt backups  
❌ Customer device was physically stolen  
❌ Customer didn't set up access control  
❌ Customer didn't respond to deletion requests  
❌ Customer didn't report GDPR/KVKK breach in 72 hours  
❌ Customer didn't maintain compliance records  

**Result**: StoreMind carries ZERO legal risk (local processing = no liability)

### 6.2 Customer IS Liable

Customer responsible for:

✓ All GDPR/KVKK compliance  
✓ All technical security  
✓ All access control  
✓ All data purging  
✓ All incident response  
✓ All regulatory reporting  

---

## 7. Data Transfer Agreement

### 7.1 Data Transfer Policy

StoreMind:
- ❌ Never transfers data (cloud)
- ✓ Exports data on request (CSV/JSON)
- ✓ Customer can transfer to cloud (own responsibility)

### 7.2 Optional Cloud Integration

If customer connects cloud (Supabase, AWS, etc.):

**StoreMind's role:**
- Provides data export mechanism
- Provides integration documentation

**Customer's role:**
- Chooses cloud service
- Signs separate DPA with cloud provider (not StoreMind)
- Takes responsibility for cloud compliance

**StoreMind's liability:** ZERO

---

## 8. Cybersecurity

### 8.1 StoreMind Controls

StoreMind framework provides:

✓ Encryption (AES-256)  
✓ Audit logging  
✓ Offline operation  
✓ No external APIs  
✓ Deletion mechanisms  

### 8.2 Customer Controls

Customer implements:

✓ Full-disk encryption  
✓ Network segmentation  
✓ Access logging  
✓ Intrusion detection  
✓ Firewall rules  
✓ Regular updates  

---

## 9. Compliance Monitoring

### 9.1 StoreMind's Role

StoreMind does NOT:
- Audit customer database
- Monitor customer access control
- Verify customer compliance
- Collect customer logs

StoreMind CAN:
- Provide technical support
- Supply compliance checklist
- Offer best practice guidance

### 9.2 Customer's Role

Customer responsible for:

✓ Regular internal audit (GDPR/KVKK)  
✓ Penetration testing (annual)  
✓ Access control review (quarterly)  
✓ Incident response plan (written)  
✓ Staff training (annual)  

---

## 10. Liability & Indemnification

### 10.1 Limited Liability

StoreMind has **ZERO liability** because:

```
StoreMind stores NO data
StoreMind processes NO data in cloud
StoreMind has NO access to customer data
StoreMind transfers NO data to third parties

Result: StoreMind cannot be liable for:
- Data misuse (never happened)
- Data breach (never stored)
- Data transfer risk (never transferred)
- Regulatory violation (customer's jurisdiction)
```

### 10.2 Rare Exceptions

StoreMind IS liable ONLY if:

```
StoreMind intentionally sends data to cloud
StoreMind intentionally collects telemetry and sells it
StoreMind intentionally opens a backdoor
StoreMind intentionally steals encryption key

(None of these will happen — code review prevents it)
```

---

## 11. Term & Termination

### 11.1 Validity

This DPA:
- Starts: When customer begins using StoreMind
- Ends: When customer stops using StoreMind
- Default: This agreement applies (no other written agreement)

### 11.2 Termination

When customer stops using StoreMind:

```
1. All data belongs to customer (was always customer's)
2. StoreMind retains nothing (never held any)
3. Customer can delete / transfer data
4. DPA automatically ends
```

---

## 12. Additional Obligations

### 12.1 Data Subject Rights

**Access Request (Subject Access Request)**

```
Person: "What data do you have about me?"
Customer: Query database → export → provide
StoreMind: Supports (technical guidance)
```

**Deletion Request (Right to Erasure)**

```
Person: "Delete me"
Customer: DELETE from database → execute → confirm
StoreMind: Provides deletion tools
```

**Export Request (Data Portability)**

```
Person: "Export my data"
Customer: CSV/JSON export → provide to person
StoreMind: Provides export mechanisms
```

### 12.2 Correction Request (Rectification)

```
Person: "My data is wrong"
Customer: UPDATE in database → confirm
StoreMind: Maintains audit trail
```

---

## 13. Signature & Acceptance

By downloading or using StoreMind software, customer:

```
☑ Understands all obligations
☑ Accepts all responsibility
☑ Understands GDPR/KVKK compliance is customer's duty
☑ Understands StoreMind stores no data
☑ Understands technical support is available
```

---

## 14. Contact

Questions about this DPA?

- **dpa@storemind.ai**
- **legal@storemind.ai**
- **compliance@storemind.ai**

---

**Last Updated**: June 2026  
**Version**: 1.0  
**Status**: In Effect
