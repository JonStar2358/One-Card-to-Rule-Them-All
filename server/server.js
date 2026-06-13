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
const matchmakingRoutes = require('./routes/matchmaking');

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
app.use('/api/matchmaking', matchmakingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// WebSocket connections for real-time battles
const activeSessions = new Map(); // userId -> ws
const battleRooms = new Map(); // battleId -> {players: Set, battleState}

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  let userId = null;
  let battleId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('WebSocket message:', data.type);

      if (data.type === 'auth') {
        userId = data.userId;
        activeSessions.set(userId, ws);
        ws.send(JSON.stringify({ type: 'auth_success' }));
      } 
      else if (data.type === 'join_battle') {
        battleId = data.battleId;
        if (!battleRooms.has(battleId)) {
          battleRooms.set(battleId, { players: new Set(), battleState: {} });
        }
        const room = battleRooms.get(battleId);
        room.players.add(ws);
        ws.battleId = battleId;
        
        // Notify both players that battle is ready
        room.players.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'battle_ready', battleId }));
          }
        });
      }
      else if (data.type === 'battle_action') {
        if (battleId && battleRooms.has(battleId)) {
          const room = battleRooms.get(battleId);
          // Broadcast action to all players in battle
          room.players.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client !== ws) {
              client.send(JSON.stringify({ 
                type: 'opponent_action',
                action: data.action,
                turn: data.turn
              }));
            }
          });
        }
      }
      else if (data.type === 'battle_end') {
        if (battleId && battleRooms.has(battleId)) {
          const room = battleRooms.get(battleId);
          room.players.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ 
                type: 'battle_ended',
                result: data.result
              }));
            }
          });
          // Clean up battle room after a delay
          setTimeout(() => battleRooms.delete(battleId), 5000);
        }
      }
    } catch (err) {
      console.error('WebSocket error:', err);
    }
  });

  ws.on('close', () => {
    if (userId) {
      activeSessions.delete(userId);
    }
    if (battleId && battleRooms.has(battleId)) {
      const room = battleRooms.get(battleId);
      room.players.delete(ws);
      if (room.players.size === 0) {
        battleRooms.delete(battleId);
      }
    }
    console.log('WebSocket client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Elementara server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
  console.log(`Matchmaking system active`);
});
