const express = require('express');
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// Get player profile
router.get('/profile', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, gold, gems, xp, level, created_at FROM users WHERE id = $1',
      [req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const { activeCard } = req.body;
    await pool.query(
      'UPDATE users SET updated_at = $1 WHERE id = $2',
      [new Date(), req.userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get collection
router.get('/collection', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, card_id, level, xp FROM collections WHERE user_id = $1 ORDER BY created_at',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch collection' });
  }
});

// Upgrade card
router.post('/collection/:cardId/upgrade', async (req, res) => {
  try {
    const { cardId } = req.params;
    const result = await pool.query(
      'SELECT level FROM collections WHERE user_id = $1 AND card_id = $2',
      [req.userId, cardId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const currentLevel = result.rows[0].level;
    if (currentLevel >= 10) {
      return res.status(400).json({ error: 'Card already max level' });
    }

    const upgradeCost = 30 + currentLevel * 25;
    const userResult = await pool.query('SELECT gold FROM users WHERE id = $1', [req.userId]);
    if (userResult.rows[0].gold < upgradeCost) {
      return res.status(400).json({ error: 'Insufficient gold' });
    }

    await pool.query(
      'UPDATE collections SET level = level + 1, xp = 0 WHERE user_id = $1 AND card_id = $2',
      [req.userId, cardId]
    );
    await pool.query(
      'UPDATE users SET gold = gold - $1 WHERE id = $2',
      [upgradeCost, req.userId]
    );

    res.json({ success: true, newLevel: currentLevel + 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upgrade failed' });
  }
});

module.exports = router;
