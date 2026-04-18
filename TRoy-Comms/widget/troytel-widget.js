/**
 * TRoyTel™ — One-Click Call Widget
 * Inject into any TRoy Group™ website contact section
 * Supports: SIP call, Jitsi video, Email
 * © TRoy Group™ | groupoftroy@gmail.com
 *
 * Usage:
 *   <script src="troytel-widget.js"
 *     data-sip="troymaritimeagency@sip2sip.info"
 *     data-jitsi="TRoyMaritime-OpsRoom"
 *     data-email="troymaritimeagency@gmail.com"
 *     data-name="TRoy Maritime Agency™"
 *     data-color="#00d4e8">
 *   </script>
 */

(function () {
  const script   = document.currentScript;
  const sip      = script.getAttribute('data-sip')    || 'troygroup@sip2sip.info';
  const jitsi    = script.getAttribute('data-jitsi')  || 'TRoyGroup-AllHands';
  const email    = script.getAttribute('data-email')  || 'groupoftroy@gmail.com';
  const name     = script.getAttribute('data-name')   || 'TRoy Group™';
  const color    = script.getAttribute('data-color')  || '#00d4e8';
  const target   = script.getAttribute('data-target') || null; // optional CSS selector to inject into

  // ─── Styles ───────────────────────────────────────────
  const css = `
    .troytel-widget {
      background: linear-gradient(135deg, #0a1120 0%, #05080d 100%);
      border: 1px solid ${color}44;
      border-radius: 12px;
      padding: 28px 24px;
      margin: 24px 0;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      color: #c8d8f0;
      box-shadow: 0 0 30px ${color}15;
    }
    .troytel-widget-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }
    .troytel-logo {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .troytel-logo span { color: ${color}; }
    .troytel-online {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: #00ff9d;
      background: rgba(0,255,157,0.08);
      border: 1px solid rgba(0,255,157,0.2);
      padding: 2px 10px;
      border-radius: 20px;
    }
    .troytel-dot {
      width: 6px; height: 6px;
      background: #00ff9d;
      border-radius: 50%;
      animation: troytel-pulse 1.5s infinite;
    }
    @keyframes troytel-pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50% { opacity:0.4; transform:scale(0.8); }
    }
    .troytel-tagline {
      font-size: 13px;
      color: #6080a0;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .troytel-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .troytel-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      letter-spacing: 0.3px;
    }
    .troytel-btn-call {
      background: ${color};
      color: #05080d;
    }
    .troytel-btn-video {
      background: transparent;
      color: ${color};
      border: 1.5px solid ${color};
    }
    .troytel-btn-email {
      background: transparent;
      color: #6080a0;
      border: 1.5px solid #1a2f50;
    }
    .troytel-btn:hover {
      transform: translateY(-2px);
      opacity: 0.9;
      box-shadow: 0 4px 15px ${color}30;
    }
    .troytel-btn-email:hover { color: #c8d8f0; border-color: #2a4060; }
    .troytel-sip-info {
      margin-top: 14px;
      font-size: 11px;
      color: #3a5070;
      font-family: 'Share Tech Mono', 'Courier New', monospace;
    }
    .troytel-sip-info span { color: ${color}88; }
    @media (max-width: 480px) {
      .troytel-btn { width: 100%; justify-content: center; }
      .troytel-buttons { flex-direction: column; }
    }
  `;

  // ─── HTML ─────────────────────────────────────────────
  const html = `
    <div class="troytel-widget">
      <div class="troytel-widget-header">
        <div class="troytel-logo"><span>TRoy</span>Tel™</div>
        <div class="troytel-online">
          <span class="troytel-dot"></span> Online
        </div>
      </div>
      <p class="troytel-tagline">
        Connect directly with <strong style="color:#c8d8f0">${name}</strong> —
        free call, video meeting, or email.
      </p>
      <div class="troytel-buttons">
        <a href="sip:${sip}" class="troytel-btn troytel-btn-call">
          📞 Call Now (Free)
        </a>
        <a href="https://meet.jit.si/${jitsi}" target="_blank" class="troytel-btn troytel-btn-video">
          🎥 Video Meeting
        </a>
        <a href="mailto:${email}" class="troytel-btn troytel-btn-email">
          ✉️ Send Email
        </a>
      </div>
      <p class="troytel-sip-info">
        SIP: <span>${sip}</span> &nbsp;·&nbsp;
        Powered by <span>TRoyTel™</span> &nbsp;·&nbsp;
        <a href="https://troytel-signaling.onrender.com" target="_blank" style="color:#3a5070;text-decoration:none;">TRoy Group™</a>
      </p>
    </div>
  `;

  // ─── Inject ───────────────────────────────────────────
  function inject() {
    // Add styles
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Create widget element
    const div = document.createElement('div');
    div.innerHTML = html;

    // Find injection point
    let anchor = null;
    if (target) {
      anchor = document.querySelector(target);
    } else {
      // Auto-detect: look for #contact, .contact, footer — insert before footer or after contact heading
      anchor = document.querySelector('#contact') ||
               document.querySelector('.contact-grid') ||
               document.querySelector('.cta') ||
               document.querySelector('footer');
    }

    if (anchor) {
      anchor.parentNode.insertBefore(div, anchor);
    } else {
      document.body.appendChild(div);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
