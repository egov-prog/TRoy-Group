/**
 * TRoyTel™ — WebRTC Engine (Client)
 * Handles: getUserMedia, PeerConnection, Signaling via Socket.io
 * © TRoy Group™
 */

const SIGNALING_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3500'
  : 'https://troytel-signaling.onrender.com';

class TRoyTelWebRTC {
  constructor() {
    this.socket         = null;
    this.localStream    = null;
    this.peers          = {};   // socketId → RTCPeerConnection
    this.mySocketId     = null;
    this.currentRoom    = null;
    this.userName       = null;
    this.division       = 'general';

    this.iceServers = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' }
    ];
  }

  // ─── Connect to Signaling Server ──────────────────────
  connect() {
    this.socket = io(SIGNALING_URL, { transports: ['websocket'] });

    this.socket.on('connect', () => {
      this.mySocketId = this.socket.id;
      window.onSocketConnected(this.socket.id);
    });

    this.socket.on('disconnect', () => {
      window.onSocketDisconnected();
    });

    this.socket.on('room-info', ({ participants }) => {
      participants.forEach(p => this._initiateCall(p.socketId));
    });

    this.socket.on('user-joined', ({ socketId, userName }) => {
      window.onUserJoined(socketId, userName);
    });

    this.socket.on('user-left', ({ socketId, userName }) => {
      this._removePeer(socketId);
      window.onUserLeft(socketId, userName);
    });

    this.socket.on('offer',         d => this._handleOffer(d));
    this.socket.on('answer',        d => this._handleAnswer(d));
    this.socket.on('ice-candidate', d => this._handleICE(d));
    this.socket.on('chat-message',  d => window.onChatMessage(d));
    this.socket.on('peer-media-state', d => window.onPeerMediaState(d));
  }

  // ─── Start Local Media ────────────────────────────────
  async startLocalMedia(video = true, audio = true) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
      document.getElementById('localVideo').srcObject = this.localStream;
      return true;
    } catch (err) {
      console.warn('[TRoyTel] Media access denied, audio only attempt...');
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
      } catch (e) {
        console.error('[TRoyTel] No media access:', e);
        return false;
      }
    }
  }

  // ─── Join Room ────────────────────────────────────────
  joinRoom(roomId, userName, division) {
    this.currentRoom = roomId;
    this.userName    = userName;
    this.division    = division;
    this.socket.emit('join-room', { roomId, userName, division });
  }

  // ─── Initiate Call to Existing Peer ──────────────────
  async _initiateCall(remoteSocketId) {
    const pc = this._createPeerConnection(remoteSocketId);
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.socket.emit('offer', { to: remoteSocketId, offer });
    } catch (err) {
      console.error('[TRoyTel] Offer failed:', err);
    }
  }

  // ─── Handle Incoming Offer ────────────────────────────
  async _handleOffer({ from, offer }) {
    const pc = this._createPeerConnection(from);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.socket.emit('answer', { to: from, answer });
  }

  // ─── Handle Answer ────────────────────────────────────
  async _handleAnswer({ from, answer }) {
    const pc = this.peers[from];
    if (pc) await pc.setRemoteDescription(new RTCSessionDescription(answer));
  }

  // ─── Handle ICE Candidate ─────────────────────────────
  async _handleICE({ from, candidate }) {
    const pc = this.peers[from];
    if (pc && candidate) {
      try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch(e){}
    }
  }

  // ─── Create RTCPeerConnection ─────────────────────────
  _createPeerConnection(remoteSocketId) {
    const pc = new RTCPeerConnection({ iceServers: this.iceServers });
    this.peers[remoteSocketId] = pc;

    // Add local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
    }

    // ICE
    pc.onicecandidate = ({ candidate }) => {
      if (candidate) this.socket.emit('ice-candidate', { to: remoteSocketId, candidate });
    };

    // Remote stream
    pc.ontrack = ({ streams }) => {
      window.onRemoteStream(remoteSocketId, streams[0]);
    };

    pc.onconnectionstatechange = () => {
      if (['disconnected','failed','closed'].includes(pc.connectionState)) {
        this._removePeer(remoteSocketId);
      }
    };

    return pc;
  }

  // ─── Remove Peer ──────────────────────────────────────
  _removePeer(socketId) {
    if (this.peers[socketId]) {
      this.peers[socketId].close();
      delete this.peers[socketId];
    }
    const el = document.getElementById(`remote-${socketId}`);
    if (el) el.remove();
  }

  // ─── Toggle Mic ───────────────────────────────────────
  toggleMic() {
    if (!this.localStream) return;
    const enabled = this.localStream.getAudioTracks()[0]?.enabled;
    this.localStream.getAudioTracks().forEach(t => t.enabled = !enabled);
    this._emitMediaState();
    return !enabled;
  }

  // ─── Toggle Camera ────────────────────────────────────
  toggleCamera() {
    if (!this.localStream) return;
    const enabled = this.localStream.getVideoTracks()[0]?.enabled;
    this.localStream.getVideoTracks().forEach(t => t.enabled = !enabled);
    this._emitMediaState();
    return !enabled;
  }

  // ─── Screen Share ─────────────────────────────────────
  async startScreenShare() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      Object.values(this.peers).forEach(pc => {
        const sender = pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(screenTrack);
      });
      document.getElementById('localVideo').srcObject = screenStream;
      screenTrack.onended = () => this._restoreCamera();
    } catch (err) {
      console.error('[TRoyTel] Screen share failed:', err);
    }
  }

  async _restoreCamera() {
    const videoTrack = this.localStream?.getVideoTracks()[0];
    if (videoTrack) {
      Object.values(this.peers).forEach(pc => {
        const sender = pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
      });
      document.getElementById('localVideo').srcObject = this.localStream;
    }
  }

  _emitMediaState() {
    if (!this.currentRoom) return;
    const audio = this.localStream?.getAudioTracks()[0]?.enabled ?? false;
    const video = this.localStream?.getVideoTracks()[0]?.enabled ?? false;
    this.socket.emit('media-state', { roomId: this.currentRoom, audio, video });
  }

  // ─── Send Chat ────────────────────────────────────────
  sendChat(message) {
    if (!this.currentRoom || !message.trim()) return;
    this.socket.emit('chat-message', { roomId: this.currentRoom, message: message.trim() });
  }

  // ─── Hangup ───────────────────────────────────────────
  hangup() {
    Object.keys(this.peers).forEach(id => this._removePeer(id));
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    document.getElementById('localVideo').srcObject = null;
    this.currentRoom = null;
  }
}

// Instantiate globally
window.troyTel = new TRoyTelWebRTC();
window.troyTel.connect();
