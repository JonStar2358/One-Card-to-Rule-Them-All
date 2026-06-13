const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// Create battle
router.post('/create', async (req, res) => {
  try {
    const { cardId, opponentId } = req.body;
    const battleId = uuidv4();

    await pool.query(
      'INSERT INTO battles (id, player1_id, player2_id, player1_card_id, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [battleId, req.userId, opponentId, cardId, 'waiting', new Date()]
    );

    res.json({ success: true, battleId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create battle' });
  }
});

// Get battle
router.get('/:battleId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM battles WHERE id = $1',
      [req.params.battleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Battle not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch battle' });
  }
});

// Get battle history
router.get('/history', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM battles 
       WHERE player1_id = $1 OR player2_id = $1 
       ORDER BY created_at DESC 
       LIMIT 20`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch battle history' });
  }
});

module.exports = router;
