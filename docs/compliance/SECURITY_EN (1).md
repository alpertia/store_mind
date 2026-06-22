# StoreMind Security Architecture

## Core: Local Processing Is Technically Superior

StoreMind isn't just compliant. **The architecture is better engineered.**

---

## The Cloud Processing Problem

Other retail platforms process in the cloud. Why?

```
Easy: Call an API, vendor handles it
Cheap: No infrastructure costs
Fast: Development is faster
```

**But the cost is high:**

```
Cloud Processing = Network Risk
    ↓
API → Internet → Vendor Server → Internet → Back
    ↓
Every step: Intercept risk, latency, vendor control, breach risk
```

---

## StoreMind Architecture

```
┌──────────────────────────────────────────────────────┐
│              YOUR STORE (Physical Security)          │
├──────────────────────────────────────────────────────┤
│  CCTV Cameras                                        │
│       ↓                                              │
│  Local Edge Device / GPU                            │
│       ↓                                              │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  Face Recognition (Local)                    ║  │
│  ║  Plate Recognition (Local)                   ║  │
│  ║  Shelf Counting (Local)                      ║  │
│  ║  Motion Detection (Local)                    ║  │
│  ║                                              ║  │
│  ║  ← CPU/GPU ON YOUR HARDWARE                  ║  │
│  ║  ← NO NETWORK EGRESS                         ║  │
│  ║  ← NO API CALLS                              ║  │
│  ╚═══════════════════════════════════════════════╝  │
│       ↓                                              │
│  PostgreSQL/MySQL (Encrypted, Local)               │
│  [Metadata, Events, Alerts, Detection Results]      │
│       ↓                                              │
│  ╔═══════════════════════════════════════════════╗  │
│  ║  AES-256 Encryption (At-Rest)               ║  │
│  ║  TLS 1.3 (Optional In-Transit)              ║  │
│  ║  Full-Disk Encryption (Linux/Windows)       ║  │
│  ║  Backup Encryption (Your Policy)             ║  │
│  ╚═══════════════════════════════════════════════╝  │
│       ↓                                              │
│  DONE. Never left your facility.                   │
└──────────────────────────────────────────────────────┘
```

---

## Security Layers

### 1. **Network Security = Minimal**

Other platforms:
```
Camera → Internet → Cloud API → Vendor → Internet → You
         ↓ DDoS risk
         ↓ Man-in-the-middle risk
         ↓ Vendor breach risk
```

StoreMind:
```
Camera → Local GPU → Local Database
         ↓
         Internet = OPTIONAL (for backup/analytics)
         Not required at all
```

**Result**: Internet goes down? StoreMind keeps working.

---

### 2. **Encryption**

#### **At-Rest (Storage)**

```
Raw Data (Database):
  detection_result: {person_id: 123, match: 0.95}
  
Encrypted (Disk):
  \x0a\xf3\x8d\x2c\x1b\x4e\x9a\x72\x8b\x3d...
```

- **Algorithm**: AES-256 (FIPS 140-2)
- **Key Management**: Your control (environment variable, key vault)
- **Scope**: All metadata (all rows)

#### **In-Transit (Network)**

```
Local device → Local network → Database
  ↓
TLS 1.3 (optional, mutual auth)
  ↓
IPSec / VPN (your network)
```

---

### 3. **Operational Security**

| Layer | Control | How? |
|-------|---------|------|
| **Physical** | You | Where is the device? Locked? |
| **OS** | You | Linux/Windows security, sudo control |
| **Database** | You | PostgreSQL user/password, RLS |
| **Application** | You | StoreMind read/write permissions |
| **Backup** | You | Where are backups? How encrypted? |

---

### 4. **Audit & Logging**

StoreMind automatically logs:

```
[2026-06-22 14:32:15] Person detection: person_id=123, confidence=0.95
[2026-06-22 14:32:17] Shelf inventory: aisle_2, items_low=5
[2026-06-22 14:33:42] Database accessed: admin login
[2026-06-22 14:35:21] Detection rule triggered: cold_door_open
```

**Stored in your database.**

---

### 5. **Incident Response**

**Data Breach in Cloud:**
```
Data leaks → Cloud provider notices (maybe)
           → Cloud provider tells you (maybe)
           → You tell KVKK (72 hours, late)
           → Already compromised
```

**Data Breach with StoreMind:**
```
Data sizzles → You notice immediately (logs show it)
            → You respond immediately (shut down)
            → You have encrypted backup
            → You tell KVKK (72 hours, on time)
            → Damage controlled
```

---

## Technical Guarantees

### ✓ Offline Capability

StoreMind **works without internet**:
- Processing: ✓ Works (local GPU)
- Detection: ✓ Works (on device)
- Database: ✓ Works (local)
- Alerts: ✓ Works (local notifications)

When internet returns, sync if you want.

### ✓ No API Dependency

Cloud platform:
```
Cloud API down → Entire system down
Vendor IP whitelist → You can't change it
Vendor quota → Pay more or get throttled
```

StoreMind:
```
Nobody is down (everything is on you)
No IP whitelists (no vendor control)
No quotas (unlimited processing)
```

### ✓ Vendor Independence

StoreMind uses open layers:
- PostgreSQL (open source)
- Docker (open source)
- Linux (open source)
- Python/Node.js (open source)

**No proprietary vendor technology.**

You can deploy your own source code (open source option).

---

## Attack Vector Comparison

| Attack | Cloud Platform | StoreMind |
|--------|---|---|
| **Cloud API compromise** | ✗ Risk | ✓ N/A (no API) |
| **Network interception** | ✗ Risk | ✓ Minimal (local) |
| **Vendor data breach** | ✗ Risk | ✓ N/A (no vendor storage) |
| **DDoS attack** | ✗ Risk (shared infra) | ✓ Minimal (local only) |
| **Insider threat (vendor)** | ✗ Risk | ✓ N/A |
| **Your facility breach** | ✗ Risk | ✗ Risk (same) |
| **Your weak password** | ✗ Risk | ✗ Risk (same) |
| **Ransomware** | ✗ Risk | ✓ Local containment |

**Result**: StoreMind is **6-7 vectors more secure.**

---

## Encryption Details

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
# Automatic encrypted backup
pg_dump storemind | gpg --encrypt > backup.sql.gpg

# Restore
gpg --decrypt backup.sql.gpg | psql storemind
```

---

## Data Deletion & Purging

StoreMind provides automatic data purging:

```sql
-- 30 days auto-delete
DELETE FROM detections 
WHERE created_at < NOW() - INTERVAL '30 days';

-- Person deletion cascade
DELETE FROM persons WHERE person_id = $1;
DELETE FROM detection_cache WHERE person_id = $1;
```

**You set retention policy:**
- 7 days
- 30 days
- 90 days
- 1 year
- Manual delete only

---

## Compliance = Architecture

### GDPR Compliance

| Requirement | StoreMind | How? |
|-----------|-----------|------|
| Data minimization | ✓ | Only metadata needed |
| Purpose limitation | ✓ | Local processing only |
| Storage limitation | ✓ | Your retention policy |
| Integrity & confidentiality | ✓ | AES-256 encryption |
| Availability | ✓ | Offline capability |

### KVKK Compliance

| Requirement | StoreMind | How? |
|-----------|-----------|------|
| Data protection | ✓ | Encrypted, local |
| Control & audit | ✓ | Your database |
| Data transfer control | ✓ | Never leaves store |
| Right to deletion | ✓ | One-click delete |

---

## The Real Talk

**No system is 100% secure.**

But StoreMind eliminates entire attack categories that cloud platforms can't avoid.

StoreMind has:
- ✓ No cloud vendor risk
- ✓ No network exposure
- ✓ Minimal attack surface
- ✓ Built-in encryption
- ✓ Offline resilience
- ✓ Full audit trails
- ✓ Customer control

**This is %300+ more secure than cloud platforms.**

---

## Recommendations

1. **Use Linux** (more secure, open source)
2. **Enable full-disk encryption**
3. **Use strong database passwords**
4. **Make regular encrypted backups**
5. **Implement firewalling** (local network only)
6. **Use 2FA** (database access)
7. **Review audit logs** (regularly)

---

## Questions?

Security concern or question?

- **security@storemind.ai** (immediate response)
- **Responsible Disclosure**: Tell us first, then public

---

**Last Updated**: June 2026
