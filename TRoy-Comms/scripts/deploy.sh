#!/bin/bash
# ============================================================
#  TRoyTel™ — Deploy Script
#  Deploys signaling server to Render.com FREE tier
#  (Free: 750 hrs/month, auto-sleep after 15min inactivity)
#
#  Usage: bash scripts/deploy.sh
# ============================================================

set -e

CYAN='\033[0;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${CYAN}[TRoyTel™] Deploying to Render.com...${NC}"

# ─── Check git ────────────────────────────────────────────
if [ ! -d .git ]; then
  echo -e "${YELLOW}Initializing git...${NC}"
  git init
  git remote add origin https://github.com/egov-prog/TRoy-Group.git 2>/dev/null || true
fi

# ─── Stage and commit ─────────────────────────────────────
git add -A
git commit -m "TRoyTel™ v1.0.0 — TRoy Group Communications Engine

- WebRTC P2P calling with Socket.io signaling
- SMS relay: TextBelt (free) + Twilio adapter
- Asterisk SIP/PBX config for all divisions
- Jitsi Meet API integration
- Matrix/Synapse team messaging config
- Per-division configs: Maritime, Travel, Trading
- Docker Compose full stack
- Nginx reverse proxy with WSS support
© TRoy Group™" 2>/dev/null || echo "Nothing new to commit"

# ─── Push ─────────────────────────────────────────────────
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push origin main 2>/dev/null || git push origin master 2>/dev/null || echo "Push failed — check credentials"

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  TRoyTel™ pushed to GitHub!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}To deploy FREE on Render.com:${NC}"
echo "  1. Go to: https://render.com"
echo "  2. New → Web Service"
echo "  3. Connect: github.com/egov-prog/TRoy-Group"
echo "  4. Root directory: TRoy-Comms"
echo "  5. Build command: npm install"
echo "  6. Start command: npm start"
echo "  7. Add env vars from your .env file"
echo "  8. Select FREE tier → Deploy"
echo ""
echo -e "${CYAN}Alternative free hosts:${NC}"
echo "  • Railway.app  — https://railway.app (free tier)"
echo "  • Fly.io       — https://fly.io (generous free tier)"
echo "  • Glitch.com   — https://glitch.com (always free)"
echo ""
