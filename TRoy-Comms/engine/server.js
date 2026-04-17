/**
 * TRoyTel™ — Signaling Server
 * TRoy Group™ Communications Engine
 * WebRTC Signaling via Socket.io
 *
 * © TRoy Group™ | groupoftroy@gmail.com
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// ─── CORS ───────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : '*' }));
app.use(express.json());

// ─── Static Client ──────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'client')));

// ─── Health Check ───────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TRoyTel™ Signaling Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    rooms: rooms.size,
    users: connectedUsers.size
  });
});

// ─── REST: Create Room ──────────────────────────────────────────
app.post('/api/room', (req, res) => {
  const roomId = req.body.roomId || uuidv4();
  const division = req.body.division || 'general';
  rooms.set(roomId, { id: roomId, division, participants: [], created: Date.now() });
  res.json({ roomId, division, url: `${process.env.SERVER_URL || ''}/?room=${roomId}` });
});

// ─── REST: Room Info ────────────────────────────────────────────
app.get('/api/room/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
});

// ─── REST: SMS Send ─────────────────────────────────────────────
const { sendSMS } = require('./sms-relay');
app.post('/api/sms', async (req, res) => {
  const { to, message, provider } = req.body;
  if (!to || !message) return res.status(400).json({ error: 'to and message required' });
  try {
    const result = await sendSMS(to, message, provider);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── In-Memory State ────────────────────────────────────────────
const rooms = new Map();           // roomId → { participants: [socketId] }
const connectedUsers = new Map();  // socketId → { name, division, roomId }

// ─── Socket.io Signaling ────────────────────────────────────────
const io = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
  console.log(`[TRoyTel] Connected: ${socket.id}`);

  // --- Join Room ---
  socket.on('join-room', ({ roomId, userName, division }) => {
    if (!roomId) return;

    socket.join(roomId);
    connectedUsers.set(socket.id, { name: userName || 'Unknown', division: division || 'general', roomId });

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { id: roomId, division, participants: [], created: Date.now() });
    }
    const room = rooms.get(roomId);
    if (!room.participants.includes(socket.id)) room.participants.push(socket.id);

    // Notify others in room
    socket.to(roomId).emit('user-joined', { socketId: socket.id, userName, division });

    // Send current participants to joining user
    socket.emit('room-info', {
      roomId,
      participants: room.participants.filter(id => id !== socket.id).map(id => ({
        socketId: id,
        ...connectedUsers.get(id)
      }))
    });

    console.log(`[TRoyTel] ${userName} joined room: ${roomId}`);
  });

  // --- WebRTC Offer ---
  socket.on('offer', ({ to, offer }) => {
    io.to(to).emit('offer', { from: socket.id, offer });
  });

  // --- WebRTC Answer ---
  socket.on('answer', ({ to, answer }) => {
    io.to(to).emit('answer', { from: socket.id, answer });
  });

  // --- ICE Candidate ---
  socket.on('ice-candidate', ({ to, candidate }) => {
    io.to(to).emit('ice-candidate', { from: socket.id, candidate });
  });

  // --- Chat Message ---
  socket.on('chat-message', ({ roomId, message }) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;
    io.to(roomId).emit('chat-message', {
      from: socket.id,
      userName: user.name,
      division: user.division,
      message,
      timestamp: new Date().toISOString()
    });
  });

  // --- Mute/Unmute notification ---
  socket.on('media-state', ({ roomId, audio, video }) => {
    socket.to(roomId).emit('peer-media-state', { from: socket.id, audio, video });
  });

  // --- Disconnect ---
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user && user.roomId) {
      const room = rooms.get(user.roomId);
      if (room) {
        room.participants = room.participants.filter(id => id !== socket.id);
        if (room.participants.length === 0) rooms.delete(user.roomId);
      }
      socket.to(user.roomId).emit('user-left', { socketId: socket.id, userName: user.name });
    }
    connectedUsers.delete(socket.id);
    console.log(`[TRoyTel] Disconnected: ${socket.id}`);
  });
});

// ─── Start ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log('');
  console.log('  ████████╗██████╗  ██████╗ ██╗   ██╗████████╗███████╗██╗      ');
  console.log('     ██╔══╝██╔══██╗██╔═══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝██║      ');
  console.log('     ██║   ██████╔╝██║   ██║ ╚████╔╝    ██║   █████╗  ██║      ');
  console.log('     ██║   ██╔══██╗██║   ██║  ╚██╔╝     ██║   ██╔══╝  ██║      ');
  console.log('     ██║   ██║  ██║╚██████╔╝   ██║      ██║   ███████╗███████╗  ');
  console.log('     ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝╚══════╝  ');
  console.log('');
  console.log(`  TRoyTel™ Signaling Server running on port ${PORT}`);
  console.log(`  © TRoy Group™ — groupoftroy@gmail.com`);
  console.log('');
});

module.exports = { app, server, io };
