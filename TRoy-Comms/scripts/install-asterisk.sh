#!/bin/bash
# ============================================================
#  TRoyTel™ — Asterisk PBX Install & Config Helper
#  Usage: sudo bash scripts/install-asterisk.sh
# ============================================================
set -e
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${YELLOW}Installing Asterisk PBX...${NC}"
apt update -qq
apt install -y asterisk asterisk-config asterisk-modules

echo -e "${YELLOW}Copying TRoyTel™ configs...${NC}"
cp "$(dirname "$0")/../sip/extensions.conf" /etc/asterisk/extensions.conf
cp "$(dirname "$0")/../sip/sip.conf"        /etc/asterisk/sip.conf
cp "$(dirname "$0")/../sip/voicemail.conf"  /etc/asterisk/voicemail.conf

echo -e "${YELLOW}Restarting Asterisk...${NC}"
systemctl restart asterisk
systemctl enable asterisk

echo -e "${GREEN}Asterisk installed and running!${NC}"
echo -e "${YELLOW}IMPORTANT: Edit /etc/asterisk/sip.conf — change all CHANGE_THIS_ passwords!${NC}"
echo ""
echo "Check status: sudo asterisk -rvvv"
echo "View logs:    sudo tail -f /var/log/asterisk/full"
