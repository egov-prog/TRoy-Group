/**
 * TRoyTel™ — Jitsi Meet Integration
 * Uses the free public Jitsi server (meet.jit.si)
 * or self-hosted Jitsi for more control
 * © TRoy Group™
 */

const JITSI_CONFIG = {
  // Public free server — no account needed
  domain: process.env.JITSI_DOMAIN || 'meet.jit.si',

  // Room naming convention for TRoy Group™
  rooms: {
    maritime:  'TRoyMaritime-OpsRoom',
    travel:    'TRoyGo-TravelTeam',
    trading:   'TRoyTrading-Partners',
    media:     'TRoyMEDIA-Studio',
    garage:    'TRoyGAR-Lab',
    allhands:  'TRoyGroup-AllHands',
    boardroom: 'TRoyGroup-BoardRoom'
  },

  // Default options
  options: {
    width:          '100%',
    height:         600,
    parentNode:     null,   // Set in your HTML
    lang:           'en',
    configOverwrite: {
      startWithAudioMuted:  false,
      startWithVideoMuted:  false,
      enableWelcomePage:    false,
      enableClosePage:      false,
      disableDeepLinking:   true,
      prejoinPageEnabled:   false,
    },
    interfaceConfigOverwrite: {
      TOOLBAR_BUTTONS: [
        'microphone', 'camera', 'closedcaptions', 'desktop',
        'fullscreen', 'fodeviceselection', 'hangup', 'chat',
        'recording', 'raisehand', 'videoquality', 'filmstrip',
        'tileview', 'download', 'mute-everyone', 'security'
      ],
      SHOW_JITSI_WATERMARK: false,
      SHOW_BRAND_WATERMARK: true,
      BRAND_WATERMARK_LINK: 'https://troygroup.com',
      APP_NAME: 'TRoyTel™',
      NATIVE_APP_NAME: 'TRoyTel',
    }
  }
};

// Generate a shareable Jitsi URL
function getJitsiURL(roomKey = 'allhands') {
  const room = JITSI_CONFIG.rooms[roomKey] || roomKey;
  return `https://${JITSI_CONFIG.domain}/${encodeURIComponent(room)}`;
}

// Generate room links for all divisions
function getAllRoomLinks() {
  return Object.entries(JITSI_CONFIG.rooms).map(([key, name]) => ({
    division: key,
    name,
    url: `https://${JITSI_CONFIG.domain}/${encodeURIComponent(name)}`
  }));
}

module.exports = { JITSI_CONFIG, getJitsiURL, getAllRoomLinks };
