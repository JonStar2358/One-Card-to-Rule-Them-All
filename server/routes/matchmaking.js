const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// In-memory matchmaking queue (in production, use Redis)
const matchmakingQueue = new Map();
const activeBattles = new Map();

// Join matchmaking queue
router.post('/join-queue', async (req, res) => {
  try {
    const { cardId } = req.body;
    
    if (!cardId) {
      return res.status(400).json({ error: 'Card ID required' });
    }

    // Get player info
    const userResult = await pool.query(
      'SELECT id, username FROM users WHERE id = $1',
      [req.userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get card level
    const cardResult = await pool.query(
      'SELECT level FROM collections WHERE user_id = $1 AND card_id = $2',
      [req.userId, cardId]
    );
    if (cardResult.rows.length === 0) {
      return res.status(400).json({ error: 'Card not owned' });
    }

    const cardLevel = cardResult.rows[0].level;

    // Add to queue
    const queueEntry = {
      userId: req.userId,
      username: user.username,
      cardId,
      level: cardLevel,
      joinedAt: Date.now()
    };

    matchmakingQueue.set(req.userId, queueEntry);
    console.log(`[MM] Player ${user.username} joined queue with ${cardId} Lv${cardLevel}`);

    // Try to find match
    const match = findMatch(queueEntry);

    if (match) {
      // Remove both players from queue
      matchmakingQueue.delete(match.player1.userId);
      matchmakingQueue.delete(match.player2.userId);

      const battleId = uuidv4();
      activeBattles.set(battleId, match);

      return res.json({
        status: 'matched',
        battleId,
        opponent: match.player2,
        opponentCard: match.player2.cardId
      });
    }

    res.json({
      status: 'queued',
      queuePosition: matchmakingQueue.size,
      estimatedWaitSeconds: matchmakingQueue.size * 5
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join queue' });
  }
});

// Leave matchmaking queue
router.post('/leave-queue', (req, res) => {
  try {
    matchmakingQueue.delete(req.userId);
    console.log(`[MM] Player ${req.userId} left queue`);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to leave queue' });
  }
});

// Get queue status
router.get('/queue-status', (req, res) => {
  try {
    const inQueue = matchmakingQueue.has(req.userId);
    const queueSize = matchmakingQueue.size;

    res.json({
      inQueue,
      queueSize,
      estimatedWaitSeconds: queueSize * 5,
      activeBattles: activeBattles.size
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get queue status' });
  }
});

// Get battle info
router.get('/battle/:battleId', (req, res) => {
  try {
    const battle = activeBattles.get(req.params.battleId);
    if (!battle) {
      return res.status(404).json({ error: 'Battle not found' });
    }

    const isPlayer1 = battle.player1.userId === req.userId;
    if (!isPlayer1 && battle.player2.userId !== req.userId) {
      return res.status(403).json({ error: 'Not in this battle' });
    }

    res.json({
      battleId: req.params.battleId,
      isPlayer1,
      opponent: isPlayer1 ? battle.player2 : battle.player1,
      opponentCard: isPlayer1 ? battle.player2.cardId : battle.player1.cardId,
      status: battle.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get battle info' });
  }
});

// End PVP battle
router.post('/battle/:battleId/end', async (req, res) => {
  try {
    const { winnerId, winnerReward } = req.body;

    const battle = activeBattles.get(req.params.battleId);
    if (!battle) {
      return res.status(404).json({ error: 'Battle not found' });
    }

    // Validate player is in this battle
    if (req.userId !== battle.player1.userId && req.userId !== battle.player2.userId) {
      return res.status(403).json({ error: 'Not in this battle' });
    }

    // Award rewards
    if (winnerId) {
      const baseReward = 50;
      const levelBonus = winnerId === battle.player1.userId ? battle.player1.level * 5 : battle.player2.level * 5;
      const totalReward = baseReward + levelBonus;

      await pool.query(
        'UPDATE users SET gold = gold + $1 WHERE id = $2',
        [totalReward, winnerId]
      );
    }

    // Store battle result
    await pool.query(
      `INSERT INTO battles (id, player1_id, player2_id, winner_id, player1_card_id, player2_card_id, status, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [req.params.battleId, battle.player1.userId, battle.player2.userId, winnerId, battle.player1.cardId, battle.player2.cardId, 'completed', new Date()]
    );

    // Remove from active battles
    activeBattles.delete(req.params.battleId);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to end battle' });
  }
});

// Helper function to find a match
function findMatch(player) {
  if (matchmakingQueue.size < 2) return null;

  const otherPlayers = Array.from(matchmakingQueue.values())
    .filter(p => p.userId !== player.userId);

  if (otherPlayers.length === 0) return null;

  // Sort by level difference (prefer close matches)
  const sorted = otherPlayers.sort((a, b) => {
    const diffA = Math.abs(a.level - player.level);
    const diffB = Math.abs(b.level - player.level);
    return diffA - diffB;
  });

  // Prefer matches within 5 levels, but allow broader search
  const maxLevelDiff = 5;
  const closestMatch = sorted.find(p => Math.abs(p.level - player.level) <= maxLevelDiff);
  const match = closestMatch || sorted[0];

  return {
    player1: player,
    player2: match
  };
}

module.exports = router;
