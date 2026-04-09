# 🔀 TRoy Group™ — Email Workflows & Routing Rules

---

## Routing Philosophy

- **Personal email** is the master inbox — never used for brand communications.
- **Each division email** is the public-facing address for that brand only.
- **Corporate email** (`groupoftroy@gmail.com`) handles cross-division and partner-level matters.
- All division emails **forward a daily digest** (or use label-based filters) to personal email for monitoring.

---

## 1. Inbound Routing Rules

### ertangovdeli@gmail.com (Personal)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| GitHub notifications | Archive + Label | `dev/github` |
| TradingView alerts | Archive + Label | `trading/tv` |
| Bank / Financial | Star + Label | `finance` |
| Government / ABN / ATO | Star + Label | `legal-gov` |
| Any TRoy Group™ division forwards | Read-only monitor | `troy-divisions` |

### groupoftroy@gmail.com (Corporate)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| Partner / B2B inquiries | Star + Reply within 24h | `partners` |
| Legal / compliance | Star + Label | `legal` |
| Inter-division memos | Label | `internal` |

### troymaritimeagency@gmail.com (Maritime)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| Vessel name / IMO number | Star + Label | `vessels` |
| Port authority / agent | Label | `port-ops` |
| GAC / ISS / Sub-agents | Star + Label | `agents` |
| Turkish Straits / Bosphorus / Dardanelles | Star + Label | `straits` |

### troytravelagency@gmail.com (TRoyGo™)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| Booking.com | Label | `booking-com` |
| CJ Affiliate / Commission Junction | Label | `affiliates` |
| Travel inquiry / booking request | Star + Reply within 12h | `bookings` |
| AI Trip Creator feedback | Label | `ai-product` |

### troymediagency@gmail.com (Media)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| YouTube / Google notifications | Archive + Label | `youtube` |
| Client creative briefs | Star + Label | `clients` |
| Content collaboration | Label | `collabs` |

### thetroygarage@gmail.com (Garage)
| From / Subject contains | Action | Label |
|------------------------|--------|-------|
| Project proposals | Star + Label | `projects` |
| Experimental / R&D | Label | `rnd` |

---

## 2. Forwarding Setup

| From | Forward to | Condition |
|------|-----------|-----------|
| troymaritimeagency@gmail.com | ertangovdeli@gmail.com | All unread after 24h |
| troytravelagency@gmail.com | ertangovdeli@gmail.com | All unread after 12h |
| groupoftroy@gmail.com | ertangovdeli@gmail.com | Starred only |

> ⚙️ Set up in Gmail → Settings → Forwarding and POP/IMAP → Add a forwarding address

---

## 3. Send As / Aliases

All division accounts should be added as **Send As** aliases in Gmail where possible, allowing management from a single inbox.

> ⚙️ Gmail → Settings → Accounts and Import → Send mail as → Add another email address

| Alias to add | In which inbox |
|-------------|----------------|
| groupoftroy@gmail.com | ertangovdeli@gmail.com |
| troymaritimeagency@gmail.com | ertangovdeli@gmail.com |
| troytravelagency@gmail.com | ertangovdeli@gmail.com |

---

## 4. Auto-Responders

| Account | Auto-responder text | When active |
|---------|-------------------|-------------|
| troymaritimeagency@gmail.com | *"Thank you for contacting TRoy Maritime Agency™. We will respond within 24 hours. For urgent vessel matters please call +61 [phone]."* | Always on |
| troytravelagency@gmail.com | *"Thank you for contacting TRoyGo™. Our team will respond within 12 hours. Explore our AI Trip Creator at [website URL]."* | Always on |

---

*Last updated: April 2026*
