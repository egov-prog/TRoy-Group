# TRoyTel™ — TRoy Group Communications Engine

> **Free. Secure. Global. Built for TRoy Group™ Business Operations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Stack: WebRTC + SIP + Matrix](https://img.shields.io/badge/Stack-WebRTC%20%2B%20SIP%20%2B%20Matrix-00bcd4.svg)]()
[![Status: Active Development](https://img.shields.io/badge/Status-Active%20Development-green.svg)]()

---

## 🌐 What is TRoyTel™?

**TRoyTel™** is the unified, open-source communications engine powering all three divisions of **TRoy Group™**:

| Division | Entity | Use Case |
|---|---|---|
| 🚢 | TRoy Maritime Agency™ | Port ops, vessel calls, agent coordination |
| ✈️ | TRoyGo™ / TRoy Travel Agency™ | Client support, trip coordination, bookings |
| 📦 | TRoy Trading Agency™ | Supplier & partner communications |

---

## ✅ Features — 100% Free Stack

| Feature | Technology | Cost |
|---|---|---|
| Browser Voice/Video Calls | WebRTC (P2P) | FREE |
| Multi-party Conference | Jitsi Meet API | FREE |
| Team Messaging / Chat | Matrix (Synapse) | FREE (self-hosted) |
| SIP/VoIP PBX | Asterisk | FREE (open-source) |
| SMS (test/dev) | TextBelt | FREE (1/day/IP) |
| SMS (production) | Twilio Free Trial | $15 credit free |
| Signaling Server | Socket.io on Render | FREE tier |
| Hosting | Render / Railway / Fly.io | FREE tier |

---

## 🏗️ Architecture

```
TRoyTel™ Engine
│
├── WebRTC Layer          → Browser P2P calls (no server needed for media)
│   └── Socket.io Server  → Signaling only (free-tier hosted)
│
├── Jitsi Layer           → Multi-party video rooms
│
├── SIP/VoIP Layer        → Asterisk PBX → PSTN / mobile calls
│   └── Free SIP Provider → sip2sip.info or VoIP.ms
│
├── Matrix Layer          → Team messaging (Element client)
│
└── SMS Layer             → TextBelt (free) → Twilio (production)
```

---

## 📁 Folder Structure

```
TRoy-Comms/
├── engine/           Core WebRTC + Socket.io signaling server
├── client/           Browser-based communication dashboard
├── sms/              SMS engine (TextBelt + Twilio adapters)
├── sip/              Asterisk PBX configuration files
├── matrix/           Matrix/Synapse homeserver config
├── jitsi/            Jitsi Meet API integration
├── divisions/        Per-division communication configs
│   ├── maritime/
│   ├── travel/
│   └── trading/
├── docker/           Docker Compose for full stack deployment
├── scripts/          Install, start, deploy scripts
└── docs/             Architecture, setup guides, provider notes
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- Docker (optional, for full stack)

### 1. Clone & Install
```bash
git clone https://github.com/egov-prog/TRoy-Group.git
cd TRoy-Group/TRoy-Comms
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Start Signaling Server
```bash
npm start
# Server runs on http://localhost:3500
```

### 4. Open Client Dashboard
```
Open client/index.html in your browser
# Or deploy to any static host (Netlify, GitHub Pages — free)
```

---

## 📲 Free Phone Numbers (Virtual)

For free virtual numbers to use with your SIP setup:

| Provider | Free Number | Notes |
|---|---|---|
| Google Voice | ✅ US numbers free | Google account required |
| sip2sip.info | ✅ SIP URI free | SIP only, no PSTN |
| VoIP.ms | Low cost | ~$0.85/month for DID |
| Twilio | Trial credit | Free $15 credit |

---

## 🏢 Division Quick Reference

| Division | Extension | SIP URI | Matrix Room |
|---|---|---|---|
| TRoy Maritime Agency™ | 100 | maritime@troy.sip | #maritime:troy.local |
| TRoyGo™ Travel | 200 | travel@troy.sip | #travel:troy.local |
| TRoy Trading Agency™ | 300 | trading@troy.sip | #trading:troy.local |
| TRoy Group™ CEO | 001 | ceo@troy.sip | #board:troy.local |

---

## 🔒 Security

- All WebRTC calls are **end-to-end encrypted** (DTLS-SRTP)
- Matrix messages are **end-to-end encrypted** (Olm/Megolm)
- SIP traffic protected via **TLS/SRTP** on Asterisk
- No call data stored — signaling server is stateless

---

## 🗺️ Roadmap

- [x] WebRTC P2P calling engine
- [x] Socket.io signaling server
- [x] Jitsi multi-party rooms
- [x] Asterisk SIP/PBX config
- [x] SMS adapters (TextBelt + Twilio)
- [x] Matrix messaging config
- [x] Per-division configs
- [ ] TRoyTel™ mobile PWA (Progressive Web App)
- [ ] TRoyGo™ client support integration
- [ ] TRoy Maritime™ vessel call notifications via SMS
- [ ] WhatsApp Business API integration

---

## 📬 Contact

**TRoy Group™** | Darwin, NT, Australia
- Maritime: troymaritimeagency@gmail.com
- Travel: troytravelagency@gmail.com
- Trading: troytradingagency@gmail.com
- Group: groupoftroy@gmail.com

---

*© TRoy Group™ — All rights reserved.*
