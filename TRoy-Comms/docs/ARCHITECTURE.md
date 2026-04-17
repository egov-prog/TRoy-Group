# TRoyTel™ — Architecture Guide

## Overview

TRoyTel™ uses a **layered, provider-agnostic** architecture. Each layer is independently replaceable and uses only free or open-source components.

---

## Layer 1 — WebRTC (Browser P2P Calls)

```
Browser A ──────────────────────────── Browser B
    │                                       │
    │     ICE/STUN/TURN negotiation         │
    └──────────────┐   ┌────────────────────┘
                   ▼   ▼
          Signaling Server (Socket.io)
          Runs on: Render.com free tier
          Purpose: Exchange SDP offers/answers
                   Exchange ICE candidates
          NOTE: No media passes through server!
                Media is peer-to-peer (WebRTC DTLS-SRTP)
```

**Why WebRTC?**
- Zero media cost — traffic flows browser-to-browser
- End-to-end encrypted (DTLS-SRTP mandatory)
- Works in all modern browsers — no app install needed
- Free STUN servers via Google (stun.l.google.com)

**Free STUN Servers used:**
```
stun:stun.l.google.com:19302
stun:stun1.l.google.com:19302
stun:stun.cloudflare.com:3478
```

---

## Layer 2 — Signaling Server (Socket.io)

The signaling server is a tiny Node.js + Socket.io app that:
1. Manages room membership
2. Relays WebRTC offers/answers between peers
3. Relays ICE candidates
4. Broadcasts chat messages
5. Serves the client HTML dashboard

**Free Hosting Options (no credit card required):**

| Host | Free Tier | Sleep? | Notes |
|---|---|---|---|
| Render.com | 750 hrs/month | Yes (15 min) | Best option |
| Railway.app | $5 credit/month | No | Generous |
| Fly.io | 3 VMs free | No | More control |
| Glitch.com | Always free | Yes | Simple |

---

## Layer 3 — SIP / VoIP (Asterisk PBX)

For calls to **real phone numbers** (PSTN), Asterisk acts as a PBX:

```
SIP Softphone (Linphone) → Asterisk → Free SIP Trunk → PSTN
```

**Free SIP Trunk: sip2sip.info**
- Provides a SIP URI (you@sip2sip.info)
- Free SIP-to-SIP calls
- For PSTN calls: use VoIP.ms (~$0.85/month for an AU DID)

**Free SIP Softphones:**
- **Linphone** — iOS, Android, Windows, Mac (fully free)
- **Zoiper** — All platforms (free basic tier)
- **MicroSIP** — Windows (free)

---

## Layer 4 — Video Conferencing (Jitsi)

Jitsi Meet (meet.jit.si) is used for:
- Multi-party video rooms (3+ people)
- Screen sharing sessions
- Client-facing video meetings

**No account needed** — just open a URL like:
`https://meet.jit.si/TRoyMaritime-OpsRoom`

For privacy/branding, self-host Jitsi on a VPS ($5/month Hetzner).

---

## Layer 5 — Team Messaging (Matrix / Element)

Matrix replaces Slack/WhatsApp for internal team chat:

```
Element App (iOS/Android/Web)
         ↓
matrix.org homeserver (free)
         ↓
Rooms: #troy-maritime, #troy-travel, #troy-trading, #troy-board
```

**Features:**
- End-to-end encryption
- File sharing
- Voice messages
- Bot integrations (vessel alerts, booking notifications)
- Federation (works with other Matrix servers)

---

## Layer 6 — SMS (Multi-provider)

```
TRoy Group™ Event
       ↓
SMS Dispatcher (engine/sms-relay.js)
       ↓
Provider Router:
  ├── TextBelt  (free: 1/day — testing)
  ├── Twilio    (free $15 trial — production)
  ├── TextMagic (paid — bulk maritime alerts)
  └── ClickSend (paid — AU numbers)
```

---

## Security Architecture

| Layer | Encryption | Standard |
|---|---|---|
| WebRTC media | DTLS-SRTP | Mandatory in browsers |
| WebRTC signaling | TLS (HTTPS/WSS) | Via Nginx/Render |
| SIP | TLS + SRTP | Via Asterisk |
| Matrix messages | Olm/Megolm E2E | Optional, enable per-room |
| SMS | Provider-dependent | TLS to API |

---

## Cost Summary (Monthly)

| Service | Free? | Paid Option |
|---|---|---|
| WebRTC calls | ✅ FREE | — |
| Signaling server (Render) | ✅ FREE | $7/month no-sleep |
| Jitsi Meet | ✅ FREE | $0 or self-host $5 |
| Matrix (matrix.org) | ✅ FREE | Self-host $5 |
| Asterisk (self-hosted) | ✅ FREE | VPS $5/month |
| SIP trunk (sip2sip) | ✅ FREE | VoIP.ms DID $0.85 |
| SMS (TextBelt free key) | ✅ 1/day | Twilio $0.0075/msg |
| **Total minimum** | **$0/month** | **~$5-15/month** |

---

*© TRoy Group™ | groupoftroy@gmail.com*
