/**
 * TRoyTel™ — SMS Relay Module
 * Supports: TextBelt (free), Twilio (free trial)
 * © TRoy Group™
 */

require('dotenv').config();
const axios = require('axios');

// ─── TextBelt (FREE: 1 SMS/day/IP, key = "textbelt") ────────────
async function sendViTextBelt(to, message) {
  const apiKey = process.env.TEXTBELT_API_KEY || 'textbelt';
  const response = await axios.post('https://textbelt.com/text', {
    phone: to,
    message,
    key: apiKey
  });
  if (!response.data.success) {
    throw new Error(`TextBelt error: ${response.data.error}`);
  }
  return { provider: 'textbelt', success: true, quotaRemaining: response.data.quotaRemaining };
}

// ─── Twilio (Free $15 trial credit) ─────────────────────────────
async function sendViaTwilio(to, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const from       = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error('Twilio credentials not configured in .env');
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const params = new URLSearchParams({ To: to, From: from, Body: message });

  const response = await axios.post(url, params.toString(), {
    auth: { username: accountSid, password: authToken },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return { provider: 'twilio', success: true, sid: response.data.sid, status: response.data.status };
}

// ─── Main Dispatcher ────────────────────────────────────────────
async function sendSMS(to, message, provider = 'textbelt') {
  console.log(`[TRoyTel SMS] Sending to ${to} via ${provider}`);
  switch (provider.toLowerCase()) {
    case 'twilio':    return await sendViaTwilio(to, message);
    case 'textbelt':
    default:          return await sendViTextBelt(to, message);
  }
}

module.exports = { sendSMS };
