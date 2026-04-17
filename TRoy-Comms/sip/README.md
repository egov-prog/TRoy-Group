# TRoyTel™ — SIP / Asterisk PBX

## What is this?

Asterisk is a **free, open-source** PBX (Private Branch Exchange) that gives TRoy Group™ a full office phone system — internal extensions, voicemail, conference rooms, and outgoing calls via a free SIP trunk.

## Free SIP Providers

| Provider | Type | Cost | Notes |
|---|---|---|---|
| **sip2sip.info** | SIP URI | FREE | Best for getting started |
| **VoIP.ms** | DID number | ~$0.85/month | Real phone number |
| **Google Voice** | US number | FREE | US accounts only |
| **Twilio** | Any country | Trial $15 | Production ready |

## Setup Steps

### 1. Install Asterisk (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install asterisk -y
```

### 2. Copy Config Files
```bash
sudo cp extensions.conf /etc/asterisk/
sudo cp sip.conf        /etc/asterisk/
sudo cp voicemail.conf  /etc/asterisk/
```

### 3. Edit Passwords
Edit `sip.conf` — replace all `CHANGE_THIS_*` values with strong passwords.

### 4. Register Free SIP Trunk
1. Go to https://www.sip2sip.info/
2. Create a free account
3. Add your username/password to `sip.conf` under `[sip2sip-trunk]`

### 5. Start Asterisk
```bash
sudo systemctl start asterisk
sudo asterisk -rvvv   # Interactive console
```

### 6. SIP Clients (Free Apps)
Install any free SIP softphone on your devices:

| App | Platform | Free? |
|---|---|---|
| **Linphone** | iOS, Android, Windows, Mac | ✅ |
| **Zoiper** | All platforms | ✅ (basic) |
| **MicroSIP** | Windows | ✅ |
| **Bria Solo** | Mobile | Free trial |

Configure with: host = your server IP, username + password from sip.conf.

## TRoy Group™ Extensions

| Extension | Entity |
|---|---|
| 001 | TRoy Group™ CEO |
| 100 | TRoy Maritime Agency™ |
| 200 | TRoyGo™ / TRoy Travel Agency™ |
| 300 | TRoy Trading Agency™ |

## Conference Rooms

| Dial | Room |
|---|---|
| *100 | Maritime Operations |
| *200 | Travel Team |
| *999 | TRoy Group™ All-Hands |
