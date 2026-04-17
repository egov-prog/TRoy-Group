# MASTER-INDEX.md — TRoy Group™ Repository
> **Repository:** `egov-prog/TRoy-Group`  
> **Last Updated:** 2026-04-18  
> **Maintainer:** Ertan Govdeli — Founder & CEO, TRoy Group™

---

## 🗂️ Repository Structure

```
TRoy-Group/
├── MASTER-INDEX.md                  ← This file
├── README.md                        ← Repo overview
├── TRoy-Group-Structure.md          ← Corporate structure diagram
├── accounts.md                      ← Email accounts reference
├── onboarding.md                    ← New member onboarding
├── security.md                      ← Security policies
├── signatures.md                    ← Email signatures
├── workflows.md                     ← Operational workflows
│
├── index.html                       ← Root portal / nav hub
├── troy-global-tracker.html         ← Vessel tracking HUD (root)
├── troy-gmail-agent.html            ← Gmail Agent UI
├── troy-maritime-home.html          ← Maritime homepage (root)
├── troygar-website.html             ← TRoy GAR™ website
├── troygo-website.html              ← TRoyGo™ website (root)
├── troymedia-website.html           ← TRoyMEDIA™ website
├── troytr-website.html              ← TRoyTR™ website (root)
├── troygo-fixes.md                  ← TRoyGo™ fix log
│
├── TRoy-Group/                      ← Main Group homepage
│   ├── README.md
│   ├── Logos/
│   │   └── TRoy-Group-Logo.png
│   └── troy-group-main.html
│
├── TRoy-Maritime-Agency/            ← TRoyMAR™ Division
│   ├── README.md
│   ├── Logos/
│   │   └── TRoy-Maritime-Agency-Logo.png
│   ├── Tools/
│   │   └── troy-global-tracker.html
│   └── Website/
│       └── troy-maritime-home.html
│
├── TRoy-Travel-Agency/              ← TRoyGo™ Division
│   ├── README.md
│   ├── Logos/
│   │   └── TRoy-Travel-Agency-Logo.png
│   └── Website/
│       ├── troygo-website.html
│       └── troygo-website-with-ai.html
│
├── TRoy-Trading-Agency/             ← TRoyTR™ Division
│   ├── README.md
│   ├── Logos/
│   │   └── TRoy-Trading-Agency-Logo.png
│   └── Website/
│       └── troytr-website.html
│
├── ai-agents/                       ← AI Agent Suite
│   ├── agents/
│   │   ├── trometry_agent/app.py
│   │   ├── troygar_agent/app.py
│   │   ├── troygo_agent/app.py
│   │   └── troyt_agent/app.py
│   ├── backend/main.py
│   └── email-agent/
│       ├── README.md
│       ├── agent/index.html
│       ├── config/config.md
│       └── prompts/
│           ├── corporate-prompt.md
│           ├── garage-prompt.md
│           ├── media-prompt.md
│           ├── personal-prompt.md
│           ├── travel-prompt.md
│           ├── troymar-prompt.md
│           └── troytr-prompt.md
│
├── email-management/                ← Email Management System
│   ├── README.md
│   ├── accounts.md
│   ├── index.html
│   ├── onboarding.md
│   ├── security.md
│   ├── signatures.md
│   └── workflows.md
│
├── TRoy-Comms/                      ← TRoyTel™ Communications Engine
│   ├── README.md                    ← Full stack overview & cost table
│   ├── package.json                 ← Node.js dependencies
│   ├── .env.example                 ← All env vars documented
│   ├── render.yaml                  ← One-click Render.com free deploy
│   ├── engine/
│   │   ├── server.js                ← WebRTC signaling server (Socket.io)
│   │   └── sms-relay.js             ← SMS dispatcher (TextBelt + Twilio)
│   ├── client/
│   │   ├── index.html               ← TRoyTel™ dashboard UI
│   │   ├── css/style.css            ← Dark/cyan TRoy™ styling
│   │   ├── js/webrtc.js             ← WebRTC P2P engine
│   │   └── js/ui.js                 ← Dashboard UI controller
│   ├── sms/
│   │   ├── sms.js                   ← Multi-provider SMS + templates
│   │   └── README.md                ← Provider comparison guide
│   ├── sip/
│   │   ├── extensions.conf          ← Asterisk dial plan (exts 001/100/200/300)
│   │   ├── sip.conf                 ← SIP peers + sip2sip.info free trunk
│   │   ├── voicemail.conf           ← Voicemail per division
│   │   └── README.md                ← Asterisk setup guide
│   ├── jitsi/config.js              ← Jitsi Meet room config per division
│   ├── matrix/README.md             ← Matrix/Element messaging guide
│   ├── divisions/
│   │   ├── maritime/config.json     ← TRoy Maritime Agency™ comms config
│   │   ├── travel/config.json       ← TRoyGo™ comms config
│   │   └── trading/config.json      ← TRoy Trading Agency™ comms config
│   ├── docker/
│   │   ├── docker-compose.yml       ← Full stack (server+Asterisk+Matrix+Nginx)
│   │   ├── Dockerfile               ← TRoyTel™ server container
│   │   └── nginx.conf               ← Reverse proxy + WSS support
│   ├── scripts/
│   │   ├── install.sh               ← Full install (Node+Asterisk+Docker)
│   │   ├── install-asterisk.sh      ← Asterisk-only install
│   │   └── deploy.sh                ← GitHub push + Render deploy guide
│   └── docs/
│       ├── ARCHITECTURE.md          ← Full layer-by-layer architecture
│       ├── FREE-PHONE-NUMBERS.md    ← Free/cheap AU virtual number guide
│       └── QUICK-START.md           ← 10-minute no-install quick start
│
└── Skills-Folder/                   ← Claude Skill Reference Files
    ├── INDEX.md
    ├── 01_TRoyGroup_Brand_Conventions.md
    ├── 02_TRoyGo_Travel_Platform_UI.md
    ├── 03_PineScript_ICT_SMC_Strategy.md
    ├── 04_TRoyMaritime_Agency_Operations.md
    ├── 05_Dark_Luxury_Frontend_Patterns.md
    └── 06_TRoyGo_AI_Trip_Planner.md
```

---

## 🌐 Websites Inventory

| Website File | Division | Status |
|---|---|---|
| `index.html` | TRoy Group™ Portal | ✅ Active |
| `TRoy-Group/troy-group-main.html` | TRoy Group™ Main | ✅ Active |
| `troy-maritime-home.html` | TRoyMAR™ (root) | ✅ Active |
| `TRoy-Maritime-Agency/Website/troy-maritime-home.html` | TRoyMAR™ | ✅ Fixed 2026-04-15 |
| `troy-global-tracker.html` | TRoyMAR™ Tracker (root) | ✅ Fixed 2026-04-15 |
| `TRoy-Maritime-Agency/Tools/troy-global-tracker.html` | TRoyMAR™ Tracker | ✅ Fixed 2026-04-15 |
| `troygo-website.html` | TRoyGo™ (root) | ✅ Active |
| `TRoy-Travel-Agency/Website/troygo-website.html` | TRoyGo™ | ✅ Fixed 2026-04-15 |
| `TRoy-Travel-Agency/Website/troygo-website-with-ai.html` | TRoyGo™ + AI | ✅ Active |
| `troytr-website.html` | TRoyTR™ (root) | ✅ Active |
| `TRoy-Trading-Agency/Website/troytr-website.html` | TRoyTR™ | ✅ Active |
| `troygar-website.html` | TRoy GAR™ | ✅ Active |
| `troymedia-website.html` | TRoyMEDIA™ | ✅ Active |
| `troy-gmail-agent.html` | Gmail Agent | ✅ Active |
| `email-management/index.html` | Email Mgmt | ✅ Active |
| `ai-agents/email-agent/agent/index.html` | AI Email Agent | ✅ Active |

---

## 📡 TRoyTel™ Communications Engine (Added 2026-04-18)

**Folder:** `TRoy-Comms/` | **Stack:** WebRTC + SIP + SMS + Matrix + Jitsi

| Feature | Technology | Cost |
|---|---|---|
| Browser P2P calls | WebRTC (DTLS-SRTP encrypted) | FREE |
| Multi-party video | Jitsi Meet (meet.jit.si) | FREE |
| Team messaging | Matrix / Element | FREE |
| SIP/VoIP PBX | Asterisk + sip2sip.info | FREE |
| SMS (testing) | TextBelt | FREE (1/day/IP) |
| SMS (production) | Twilio free trial | $15 credit |
| Signaling server | Socket.io on Render.com | FREE tier |
| **Total minimum** | | **$0/month** |

**Division Extensions:**
- Ext. 001 — TRoy Group™ CEO
- Ext. 100 — TRoy Maritime Agency™
- Ext. 200 — TRoyGo™ / TRoy Travel Agency™
- Ext. 300 — TRoy Trading Agency™

**Quick Start:** See `TRoy-Comms/docs/QUICK-START.md`
**Deploy free:** Push repo → connect to Render.com → `render.yaml` handles the rest

---

## 🔧 Fixes Applied — 2026-04-15

| Issue | File | Resolution |
|---|---|---|
| Empty file | `TRoy-Maritime-Agency/Tools/troy-global-tracker.html` | Populated from root copy |
| Empty file | `TRoy-Maritime-Agency/Website/troy-maritime-home.html` | Populated from root copy |
| Empty file | `TRoy-Travel-Agency/Website/troygo-website.html` | Populated from root copy |
| Wrong branding in title | `troy-global-tracker.html` | "Troy" → "TRoy Maritime Agency™" |
| Cloudflare email obfuscation | `troy-global-tracker.html` | Decoded → real `mailto:` links |
| Cloudflare injected script | `troy-global-tracker.html` | Removed `email-decode.min.js` |
| Duplicate file | `TRoy-Trading-Agency/troytr-website.html` | Removed (canonical in `Website/`) |

---

## 🏢 TRoy Group™ Corporate Structure

| Division | Brand | Contact |
|---|---|---|
| Group HQ | TRoy Group™ | groupoftroy@gmail.com |
| Maritime | TRoy Maritime Agency™ / TRoyMAR™ | troymaritimeagency@gmail.com |
| Travel | TRoy Travel Agency™ / TRoyGo™ | troytravelagency@gmail.com |
| Trading | TRoy Trading Agency™ / TRoyTR™ | troytradingagency@gmail.com |

---
*© TRoy Group™. All rights reserved. Repository maintained by egov-prog.*
