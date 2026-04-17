#!/bin/bash
# ============================================================
#  TRoyTel™ — Install Script
#  TRoy Group™ Communications Engine
#  Tested on: Ubuntu 22.04 LTS / Debian 12
#
#  Usage: bash scripts/install.sh
# ============================================================

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}"
echo "  ████████╗██████╗  ██████╗ ██╗   ██╗████████╗███████╗██╗     "
echo "     ██╔══╝██╔══██╗██╔═══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝██║     "
echo "     ██║   ██████╔╝██║   ██║ ╚████╔╝    ██║   █████╗  ██║     "
echo "     ██║   ██╔══██╗██║   ██║  ╚██╔╝     ██║   ██╔══╝  ██║     "
echo "     ██║   ██║  ██║╚██████╔╝   ██║      ██║   ███████╗███████╗ "
echo "     ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝╚══════╝ "
echo -e "${NC}"
echo -e "${CYAN}  TRoyTel™ Install Script — TRoy Group™${NC}"
echo ""

# ─── Check Root ───────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root: sudo bash scripts/install.sh${NC}"
  exit 1
fi

# ─── Update System ────────────────────────────────────────
echo -e "${YELLOW}[1/6] Updating system packages...${NC}"
apt update -qq && apt upgrade -y -qq

# ─── Install Node.js 18+ ──────────────────────────────────
echo -e "${YELLOW}[2/6] Installing Node.js 18...${NC}"
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt install -y nodejs
fi
echo -e "${GREEN}   Node.js: $(node -v)${NC}"
echo -e "${GREEN}   npm: $(npm -v)${NC}"

# ─── Install Asterisk ─────────────────────────────────────
echo -e "${YELLOW}[3/6] Installing Asterisk PBX...${NC}"
apt install -y asterisk asterisk-config
systemctl enable asterisk
echo -e "${GREEN}   Asterisk installed${NC}"

# ─── Install Docker (optional) ────────────────────────────
echo -e "${YELLOW}[4/6] Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  echo -e "${GREEN}   Docker installed${NC}"
else
  echo -e "${GREEN}   Docker already installed: $(docker --version)${NC}"
fi

# ─── Install npm dependencies ─────────────────────────────
echo -e "${YELLOW}[5/6] Installing TRoyTel™ dependencies...${NC}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"
npm install
echo -e "${GREEN}   npm packages installed${NC}"

# ─── Copy .env ────────────────────────────────────────────
echo -e "${YELLOW}[6/6] Setting up environment config...${NC}"
if [ ! -f .env ]; then
  cp .env.example .env
  echo -e "${GREEN}   .env created from template — edit it now!${NC}"
  echo -e "${YELLOW}   nano .env${NC}"
else
  echo -e "${GREEN}   .env already exists — skipping${NC}"
fi

# ─── Copy Asterisk configs ────────────────────────────────
echo -e "${YELLOW}Copying Asterisk config files...${NC}"
cp sip/extensions.conf /etc/asterisk/extensions.conf
cp sip/sip.conf        /etc/asterisk/sip.conf
cp sip/voicemail.conf  /etc/asterisk/voicemail.conf
echo -e "${YELLOW}⚠️  Edit /etc/asterisk/sip.conf and change all passwords!${NC}"

# ─── Done ─────────────────────────────────────────────────
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  TRoyTel™ Installation Complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo -e "  1. Edit .env with your credentials: ${YELLOW}nano .env${NC}"
echo -e "  2. Edit SIP passwords: ${YELLOW}nano /etc/asterisk/sip.conf${NC}"
echo -e "  3. Start server: ${YELLOW}npm start${NC}"
echo -e "  4. (Optional) Docker full stack: ${YELLOW}cd docker && docker compose up -d${NC}"
echo ""
echo -e "  ${CYAN}TRoy Group™ | groupoftroy@gmail.com${NC}"
echo ""
