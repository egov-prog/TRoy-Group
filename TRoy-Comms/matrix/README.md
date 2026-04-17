# TRoyTel™ — Matrix Messaging

## What is Matrix?

Matrix is a **free, open-source, federated** messaging protocol — like WhatsApp/Slack but self-hostable, with **end-to-end encryption** and no vendor lock-in.

The client app is **Element** (free on all platforms).

## Quick Start — Free (No self-hosting needed)

1. Go to https://app.element.io
2. Create account on matrix.org (free)
3. Create rooms for each TRoy division:
   - `#troy-maritime:matrix.org`
   - `#troy-travel:matrix.org`
   - `#troy-trading:matrix.org`
   - `#troy-board:matrix.org`
4. Invite team members

## TRoy Group™ Room Structure

| Room Name | Purpose |
|---|---|
| `#troy-maritime` | TRoy Maritime Agency™ ops |
| `#troy-travel` | TRoyGo™ team & client support |
| `#troy-trading` | TRoy Trading Agency™ |
| `#troy-board` | TRoy Group™ board / CEO |
| `#troy-general` | All TRoy Group™ staff |
| `#troy-alerts` | Automated system alerts (SMS, vessel notifications) |

## Self-Hosted Option (Advanced)

For full control, run your own Synapse server:

```bash
# Install with Docker
docker run -d --name synapse \
  -v /data/matrix:/data \
  -p 8008:8008 \
  matrixdotorg/synapse:latest
```

Your homeserver URL will be `matrix.yourdomain.com`.
Set `MATRIX_HOMESERVER_URL` in your `.env` file.

## Free Apps

| Platform | App | Download |
|---|---|---|
| iOS | Element | App Store |
| Android | Element | Play Store |
| Windows/Mac/Linux | Element Desktop | element.io |
| Web | Element Web | app.element.io |

## TRoyTel™ Bot Integration

The signaling server can post alerts to Matrix:
- Vessel arrival/departure notifications → `#troy-maritime`
- New booking notifications → `#troy-travel`
- System alerts → `#troy-alerts`

See `engine/server.js` for the Matrix bot integration point.
