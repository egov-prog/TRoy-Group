# TRoyTel™ — SMS Engine

## Free & Low-Cost SMS Providers

| Provider | Free Tier | Cost After | Best For | Sign Up |
|---|---|---|---|---|
| **TextBelt** | 1 SMS/day/IP | $0.01/msg | Dev/testing | textbelt.com |
| **Twilio** | $15 trial credit | ~$0.0075/msg | Production global | twilio.com |
| **TextMagic** | Trial credits | ~$0.04/msg | Bulk, maritime alerts | textmagic.com |
| **ClickSend** | Trial credits | ~$0.029/msg AU | Australia/Darwin | clicksend.com |
| **Google Voice** | FREE | FREE | US only, no API | voice.google.com |

## TRoy Group™ SMS Templates

### Vessel Arrival Alert (TRoy Maritime Agency™)
```
🚢 TRoy Maritime™: {vessel} ETA {port} — {eta}.
Contact: troymaritimeagency@gmail.com
```

### Booking Confirmation (TRoyGo™)
```
✈️ TRoyGo™: Hi {name}! Booking {ref} confirmed — {destination}.
Your World. Your Way. TRoyGo™.
```

### Trade Alert (TRoy Trading Agency™)
```
📦 TRoy Trading™: New trade inquiry ref {ref} from {counterparty}.
Reply to confirm.
```

## Usage in Code

```javascript
const { sendSMS, sendDivisionAlert } = require('./sms');

// Basic send
await sendSMS('+61XXXXXXXXXX', 'Hello from TRoy Group™', 'textbelt');

// Division alert with template
await sendDivisionAlert(
  'maritime',
  '+61XXXXXXXXXX',
  'vesselArrival',
  'MV Aurora', 'Darwin Port', '14:00 ACST'
);
```

## Environment Variables

Add to your `.env`:
```
# TextBelt (free key for 1/day)
TEXTBELT_API_KEY=textbelt

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX

# TextMagic
TEXTMAGIC_USER=your_username
TEXTMAGIC_API_KEY=your_api_key

# ClickSend
CLICKSEND_USERNAME=your_email
CLICKSEND_API_KEY=your_api_key

# Active provider
SMS_PROVIDER=textbelt
```

## Free Virtual Phone Numbers

To receive SMS for free (useful for testing):

| Service | Free Number | Notes |
|---|---|---|
| **TextNow** | ✅ US/CA number | Free app (iOS/Android) |
| **Google Voice** | ✅ US number | Google account required |
| **Receive-smss.com** | ✅ Temp numbers | Online only, not private |
| **sms2email.com.au** | AU option | Low cost AU numbers |
