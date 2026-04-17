/**
 * TRoyTel™ — UI Controller
 * Handles DOM interactions, events, callbacks from WebRTC engine
 * © TRoy Group™
 */

// ─── State ────────────────────────────────────────────
let currentDivision = 'maritime';
let micOn = true;
let camOn = true;

// ─── Division Selector ────────────────────────────────
document.querySelectorAll('.div-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.div-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDivision = btn.dataset.div;
    document.getElementById('infoDivision').textContent = divisionLabel(currentDivision);
  });
});

function divisionLabel(d) {
  return { maritime: '🚢 Maritime', travel: '✈️ Travel', trading: '📦 Trading' }[d] || d;
}

// ─── Join Room ────────────────────────────────────────
document.getElementById('btnJoin').addEventListener('click', async () => {
  const name   = document.getElementById('userName').value.trim() || 'TRoy Agent';
  const roomId = document.getElementById('roomId').value.trim();
  if (!roomId) return showToast('⚠️ Enter a Room ID');

  setStatus('connecting');
  const ok = await window.troyTel.startLocalMedia(true, true);
  if (!ok) showToast('⚠️ Camera/mic unavailable — audio only or check permissions');

  window.troyTel.joinRoom(roomId, name, currentDivision);
  document.getElementById('infoRoom').textContent     = roomId;
  document.getElementById('infoDivision').textContent = divisionLabel(currentDivision);
  document.getElementById('roomLabel').textContent    = `Room: ${roomId}`;
  addChatSystem(`You joined room: ${roomId}`);
  showToast(`✅ Joined room: ${roomId}`);
});

// ─── New Room (random) ────────────────────────────────
document.getElementById('btnNewRoom').addEventListener('click', () => {
  const id = `${currentDivision}-${Math.random().toString(36).substr(2,6)}`;
  document.getElementById('roomId').value = id;
  showToast(`Room ID generated: ${id}`);
});

// ─── Media Controls ───────────────────────────────────
document.getElementById('btnMic').addEventListener('click', () => {
  micOn = window.troyTel.toggleMic();
  const btn = document.getElementById('btnMic');
  btn.textContent = micOn ? '🎤' : '🔇';
  btn.classList.toggle('active', micOn);
});

document.getElementById('btnCam').addEventListener('click', () => {
  camOn = window.troyTel.toggleCamera();
  const btn = document.getElementById('btnCam');
  btn.textContent = camOn ? '📷' : '🚫';
  btn.classList.toggle('active', camOn);
});

document.getElementById('btnScreen').addEventListener('click', () => {
  window.troyTel.startScreenShare();
  showToast('🖥️ Screen share started');
});

document.getElementById('btnHangup').addEventListener('click', () => {
  window.troyTel.hangup();
  setStatus('disconnected');
  clearParticipants();
  document.getElementById('remoteVideos').innerHTML = '';
  addChatSystem('You left the call');
  showToast('📵 Call ended');
});

// ─── Chat ─────────────────────────────────────────────
function sendChat() {
  const input = document.getElementById('chatInput');
  const msg   = input.value.trim();
  if (!msg) return;
  window.troyTel.sendChat(msg);
  input.value = '';
}

document.getElementById('btnSend').addEventListener('click', sendChat);
document.getElementById('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChat();
});

// ─── SMS ──────────────────────────────────────────────
document.getElementById('btnSMS').addEventListener('click', async () => {
  const to       = document.getElementById('smsTo').value.trim();
  const message  = document.getElementById('smsMsg').value.trim();
  const provider = document.getElementById('smsProvider').value;
  const result   = document.getElementById('smsResult');

  if (!to || !message) return showToast('⚠️ Enter phone and message');

  try {
    const resp = await fetch('/api/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message, provider })
    });
    const data = await resp.json();
    result.className = 'result-box';
    result.textContent = `✅ ${data.provider}: ${JSON.stringify(data)}`;
  } catch (err) {
    result.className = 'result-box error';
    result.textContent = `❌ Error: ${err.message}`;
  }
  result.classList.remove('hidden');
});

// ─── Jitsi ────────────────────────────────────────────
document.getElementById('btnJitsi').addEventListener('click', () => {
  const room = document.getElementById('jitsiRoom').value.trim() || `TRoyGroup-${Date.now()}`;
  const url  = `https://meet.jit.si/${encodeURIComponent(room)}`;
  window.open(url, '_blank');
  showToast(`🎥 Jitsi room opened: ${room}`);
});

// ─── WebRTC Callbacks ─────────────────────────────────
window.onSocketConnected = (socketId) => {
  setStatus('connected');
  document.getElementById('infoSocketId').textContent = socketId.substring(0, 12) + '...';
  showToast('🔗 Connected to TRoyTel™ server');
};

window.onSocketDisconnected = () => {
  setStatus('disconnected');
  showToast('⚠️ Disconnected from server');
};

window.onUserJoined = (socketId, userName) => {
  addParticipant(socketId, userName);
  addChatSystem(`${userName || socketId} joined the room`);
};

window.onUserLeft = (socketId, userName) => {
  removeParticipant(socketId);
  addChatSystem(`${userName || socketId} left the room`);
};

window.onRemoteStream = (socketId, stream) => {
  let wrapper = document.getElementById(`remote-${socketId}`);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = `remote-${socketId}`;
    wrapper.className = 'video-wrapper';
    wrapper.innerHTML = `
      <video autoplay playsinline></video>
      <div class="video-label">${socketId.substring(0,8)}</div>
    `;
    document.getElementById('remoteVideos').appendChild(wrapper);
  }
  wrapper.querySelector('video').srcObject = stream;
};

window.onChatMessage = ({ from, userName, message, timestamp }) => {
  const isMe = from === window.troyTel.mySocketId;
  const time  = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgs  = document.getElementById('chatMessages');
  const div   = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `<span class="sender">${isMe ? 'You' : (userName || from.substring(0,8))}</span>${escapeHtml(message)}<span class="time"> ${time}</span>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
};

window.onPeerMediaState = ({ from, audio, video }) => {
  const wrapper = document.getElementById(`remote-${from}`);
  if (wrapper) {
    wrapper.querySelector('.video-label').textContent =
      `${from.substring(0,8)} ${audio ? '🎤' : '🔇'} ${video ? '📷' : '🚫'}`;
  }
};

// ─── Helpers ──────────────────────────────────────────
function addChatSystem(msg) {
  const msgs = document.getElementById('chatMessages');
  const div  = document.createElement('div');
  div.className = 'chat-msg system';
  div.textContent = `— ${msg}`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function setStatus(state) {
  const dot  = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  dot.className  = `dot ${state}`;
  text.textContent = { connected: 'Connected', disconnected: 'Disconnected', connecting: 'Connecting...' }[state] || state;
}

function addParticipant(socketId, name) {
  const list = document.getElementById('participantList');
  list.querySelector('.empty-state')?.remove();
  const li = document.createElement('li');
  li.id = `p-${socketId}`;
  li.innerHTML = `<span class="p-dot"></span>${name || socketId.substring(0,8)}`;
  list.appendChild(li);
}

function removeParticipant(socketId) {
  document.getElementById(`p-${socketId}`)?.remove();
  if (!document.querySelectorAll('#participantList li').length) {
    document.getElementById('participantList').innerHTML = '<li class="empty-state">No one connected yet</li>';
  }
}

function clearParticipants() {
  document.getElementById('participantList').innerHTML = '<li class="empty-state">No one connected yet</li>';
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
}
