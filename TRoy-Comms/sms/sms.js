/**
 * TRoyTel™ — SMS Module
 * Standalone SMS dispatcher for TRoy Group™
 * Supports: TextBelt (free), Twilio (trial), TextMagic, ClickSend
 * © TRoy Group™ | groupoftroy@gmail.com
 */

require('dotenv').config({ path: '../.env' });
const axios = require('axios');

// ─── Provider Registry ───────────────────────────────────
const PROVIDERS = {
  textbelt: {
    name: 'TextBelt',
    cost: 'FREE (1/day/IP) | $0.01/msg paid',
    signupUrl: 'https://textbelt.com',
    bestFor: 'Development & testing',
  },
  twilio: {
    name: 'Twilio',
    cost: 'FREE $15 trial credit | ~$0.0075/msg',
    signupUrl: 'https://twilio.com/try-twilio',
    bestFor: 'Production SMS — global coverage',
  },
  textmagic: {
    name: 'TextMagic',
    cost: 'Free trial credits | ~$0.04/msg',
    signupUrl: 'https://www.textmagic.com',
    bestFor: 'Bulk SMS, maritime alerts',
  },
  clicksend: {
    name: 'ClickSend',
    cost: 'Free trial | ~$0.029/msg AU',
    signupUrl: 'https://www.clicksend.com',
    bestFor: 'Australian numbers, Darwin ops',
  }
};

// ─── TextBelt ────────────────────────────────────────────
async function textbelt(to, message) {
  const key = process.env.TEXTBELT_API_KEY || 'textbelt';
  const r = await axios.post('https://textbelt.com/text', { phone: to, message, key });
  if (!r.data.success) throw new Error(`TextBelt: ${r.data.error}`);
  return { provider: 'textbelt', success: true, quotaRemaining: r.data.quotaRemaining };
}

// ─── Twilio ──────────────────────────────────────────────
async function twilio(to, message) {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: token, TWILIO_PHONE_NUMBER: from } = process.env;
  if (!sid || !token || !from) throw new Error('Twilio env vars missing');
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const r = await axios.post(url, new URLSearchParams({ To: to, From: from, Body: message }).toString(), {
    auth: { username: sid, password: token },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return { provider: 'twilio', success: true, sid: r.data.sid, status: r.data.status };
}

// ─── TextMagic ───────────────────────────────────────────
async function textmagic(to, message) {
  const { TEXTMAGIC_USER, TEXTMAGIC_API_KEY } = process.env;
  if (!TEXTMAGIC_USER || !TEXTMAGIC_API_KEY) throw new Error('TextMagic env vars missing');
  const r = await axios.post('https://rest.textmagic.com/api/v2/messages', { text: message, phones: to }, {
    auth: { username: TEXTMAGIC_USER, password: TEXTMAGIC_API_KEY },
    headers: { 'Content-Type': 'application/json' }
  });
  return { provider: 'textmagic', success: true, id: r.data.id };
}

// ─── ClickSend ───────────────────────────────────────────
async function clicksend(to, message, from = 'TRoyGroup') {
  const { CLICKSEND_USERNAME, CLICKSEND_API_KEY } = process.env;
  if (!CLICKSEND_USERNAME || !CLICKSEND_API_KEY) throw new Error('ClickSend env vars missing');
  const r = await axios.post('https://rest.clicksend.com/v3/sms/send', {
    messages: [{ source: 'TRoyTel', from, body: message, to }]
  }, { auth: { username: CLICKSEND_USERNAME, password: CLICKSEND_API_KEY } });
  return { provider: 'clicksend', success: true, status: r.data.data?.messages?.[0]?.status };
}

// ─── TRoy Group Templated Alerts ─────────────────────────
const TEMPLATES = {
  vesselArrival: (vessel, port, eta) =>
    `🚢 TRoy Maritime™: ${vessel} ETA ${port} — ${eta}. Contact: troymaritimeagency@gmail.com`,

  bookingConfirm: (name, ref, destination) =>
    `✈️ TRoyGo™: Hi ${name}! Booking ${ref} confirmed — ${destination}. Your World. Your Way. TRoyGo™.`,

  tradingAlert: (ref, counterparty) =>
    `📦 TRoy Trading™: New trade inquiry ref ${ref} from ${counterparty}. Reply to confirm.`,

  generalAlert: (msg) =>
    `🌐 TRoy Group™: ${msg} | groupoftroy@gmail.com`,
};

// ─── Main Dispatcher ─────────────────────────────────────
async function sendSMS(to, message, provider = 'textbelt') {
  console.log(`[TRoyTel SMS] → ${to} | provider: ${provider}`);
  const dispatch = { textbelt, twilio, textmagic, clicksend };
  if (!dispatch[provider]) throw new Error(`Unknown provider: ${provider}`);
  return await dispatch[provider](to, message);
}

// ─── Division Dispatcher ─────────────────────────────────
async function sendDivisionAlert(division, to, templateKey, ...args) {
  const template = TEMPLATES[templateKey];
  if (!template) throw new Error(`Unknown template: ${templateKey}`);
  const message  = template(...args);
  const provider = process.env.SMS_PROVIDER || 'textbelt';
  return await sendSMS(to, message, provider);
}

module.exports = { sendSMS, sendDivisionAlert, PROVIDERS, TEMPLATES };
