const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, level, xp, gold, created_at 
       FROM users 
       ORDER BY level DESC, xp DESC 
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
