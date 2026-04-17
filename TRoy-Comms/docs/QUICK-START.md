# TRoyTel™ — Quick Start Guide

## Get Started in 10 Minutes (No server needed)

You can use TRoyTel™ tools **right now** without installing anything.

---

## Step 1 — Free Video/Audio Calls (Instant)

Open any browser and go to:

```
https://meet.jit.si/TRoyMaritime-OpsRoom
```

Share this link with anyone — they join instantly, no account needed.

**TRoy Group™ Jitsi Rooms (bookmarked):**

| Division | Room URL |
|---|---|
| 🚢 Maritime Ops | https://meet.jit.si/TRoyMaritime-OpsRoom |
| ✈️ Travel Team | https://meet.jit.si/TRoyGo-TravelTeam |
| 📦 Trading | https://meet.jit.si/TRoyTrading-Partners |
| 🌐 All-Hands | https://meet.jit.si/TRoyGroup-AllHands |
| 🏛️ Board Room | https://meet.jit.si/TRoyGroup-BoardRoom |

---

## Step 2 — Free Team Chat (Matrix/Element)

1. Go to: **https://app.element.io**
2. Create free account
3. Search for rooms: `#troy-maritime:matrix.org`
4. Or create private rooms and invite team

**Element apps:** iOS App Store | Google Play | Windows/Mac desktop

---

## Step 3 — Free SIP Calls (via Linphone)

1. Go to: **https://www.sip2sip.info** → Register free account
2. Download **Linphone** (iOS/Android/PC — free)
3. Add SIP account in Linphone:
   - SIP URI: `yourname@sip2sip.info`
   - Password: your sip2sip password
4. Call other SIP users for free!

---

## Step 4 — Deploy TRoyTel™ Signaling Server (WebRTC)

For the full TRoyTel™ dashboard with WebRTC:

### Option A: Render.com (Easiest — Free)
1. Push this folder to GitHub
2. Go to https://render.com → New Web Service
3. Connect repo → Root dir: `TRoy-Comms`
4. Build: `npm install` | Start: `npm start`
5. Add env vars from `.env.example`
6. Deploy → you get a free URL like `https://troytel.onrender.com`

### Option B: Run Locally
```bash
cd TRoy-Comms
npm install
cp .env.example .env
# edit .env
npm start
# Open: http://localhost:3500
```

---

## Step 5 — Free SMS (Testing)

Send a test SMS right now:
```bash
curl -X POST https://textbelt.com/text \
  --data-urlencode phone='+61XXXXXXXXXX' \
  --data-urlencode "message=Hello from TRoy Group™" \
  --data-urlencode key=textbelt
```

(1 free SMS per day per IP)

---

## Summary: Free Comms Stack for TRoy Group™

| Need | Solution | Cost | Link |
|---|---|---|---|
| Video calls | Jitsi Meet | FREE | meet.jit.si |
| Team chat | Element/Matrix | FREE | app.element.io |
| SIP calls | Linphone + sip2sip | FREE | sip2sip.info |
| SMS (test) | TextBelt | FREE | textbelt.com |
| Virtual number | Google Voice | FREE | voice.google.com |
| Full dashboard | TRoyTel™ on Render | FREE | Render.com |

**Total cost: $0/month to get started.**

---

*© TRoy Group™ | Darwin, NT, Australia | groupoftroy@gmail.com*
