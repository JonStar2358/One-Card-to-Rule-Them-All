const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/player');
const battleRoutes = require('./routes/battles');
const leaderboardRoutes = require('./routes/leaderboard');
const campaignRoutes = require('./routes/campaign');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/campaign', campaignRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// WebSocket connections
const battles = new Map();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      if (data.type === 'join_battle') {
        const { battleId } = data;
        if (!battles.has(battleId)) {
          battles.set(battleId, new Set());
        }
        battles.get(battleId).add(ws);
        ws.battleId = battleId;
      } else if (data.type === 'battle_action') {
        const { battleId, action } = data;
        if (battles.has(battleId)) {
          battles.get(battleId).forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'action', action }));
            }
          });
        }
      }
    } catch (err) {
      console.error('WebSocket error:', err);
    }
  });

  ws.on('close', () => {
    if (ws.battleId && battles.has(ws.battleId)) {
      battles.get(ws.battleId).delete(ws);
      if (battles.get(ws.battleId).size === 0) {
        battles.delete(ws.battleId);
      }
    }
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Elementara server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});
