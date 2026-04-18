# TRoyTel™ — One-Click Call Widget

A lightweight, drop-in JavaScript widget that adds a **Call Now / Video Meeting / Email**
contact block to any TRoy Group™ website.

---

## How It Works

The widget auto-injects a styled contact card with three buttons:

| Button | Action |
|---|---|
| 📞 **Call Now (Free)** | Opens `sip:` link → Linphone/any SIP app dials instantly |
| 🎥 **Video Meeting** | Opens Jitsi Meet room in new tab |
| ✉️ **Send Email** | Opens email client with pre-filled address |

---

## Usage — One Line of HTML

```html
<script src="path/to/troytel-widget.js"
  data-sip="troymaritimeagency@sip2sip.info"
  data-jitsi="TRoyMaritime-OpsRoom"
  data-email="troymaritimeagency@gmail.com"
  data-name="TRoy Maritime Agency™"
  data-color="#00d4e8"
  data-target=".contact-grid">
</script>
```

---

## Parameters

| Attribute | Required | Description |
|---|---|---|
| `data-sip` | ✅ | SIP address (e.g. `troymaritimeagency@sip2sip.info`) |
| `data-jitsi` | ✅ | Jitsi room name (e.g. `TRoyMaritime-OpsRoom`) |
| `data-email` | ✅ | Email address for the division |
| `data-name` | ✅ | Display name shown in the widget |
| `data-color` | Optional | Accent colour (hex). Defaults to `#00d4e8` |
| `data-target` | Optional | CSS selector to inject before. Auto-detects if omitted |

---

## Division Reference

| Website | SIP | Jitsi Room | Colour |
|---|---|---|---|
| TRoy Group™ main | `troygroup@sip2sip.info` | `TRoyGroup-AllHands` | `#00d4e8` |
| TRoy Maritime Agency™ | `troymaritimeagency@sip2sip.info` | `TRoyMaritime-OpsRoom` | `#00d4e8` |
| TRoyGo™ Travel | `troytravelagency@sip2sip.info` | `TRoyGo-TravelTeam` | `#2ECC71` |
| TRoy Trading Agency™ | `troytradingagency@sip2sip.info` | `TRoyTrading-Partners` | `#f59e0b` |
| TRoyMEDIA™ | `troymedia@sip2sip.info` | `TRoyMEDIA-Studio` | `#a855f7` |
| TRoy GAR™ Lab | `troygar@sip2sip.info` | `TRoyGAR-Lab` | `#f97316` |

---

## Injected Websites ✅

- `TRoy-Group/troy-group-main.html`
- `troy-maritime-home.html` + `TRoy-Maritime-Agency/Website/`
- `troygo-website.html`
- `troytr-website.html`
- `troymedia-website.html`
- `troygar-website.html`

---

## How SIP Calling Works on Mobile

When a visitor taps **📞 Call Now (Free)** on their phone:

1. Phone detects the `sip:` link
2. If **Linphone** (or any SIP app) is installed → it opens and dials automatically
3. Call connects to the TRoy division's Linphone on your tablet/phone
4. **Completely free** — no phone bill, no carrier charges

On desktop browsers: opens the default SIP client if configured,
or prompts to choose an app.

---

*© TRoy Group™ | Darwin, NT, Australia | groupoftroy@gmail.com*
