const express = require('express');
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

// Get campaign progress
router.get('/progress', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT completed_stages, unlocked_stages FROM campaign_progress WHERE user_id = $1',
      [req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No campaign progress found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch campaign progress' });
  }
});

// Complete stage
router.post('/stage/:stageKey/complete', async (req, res) => {
  try {
    const { stageKey } = req.params;
    const { goldReward, xpReward } = req.body;

    const result = await pool.query(
      'SELECT completed_stages, unlocked_stages FROM campaign_progress WHERE user_id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No campaign progress found' });
    }

    const progress = result.rows[0];
    const completed = new Set(progress.completed_stages || []);
    const unlocked = new Set(progress.unlocked_stages || []);

    completed.add(stageKey);

    // TODO: Add logic to unlock next stages
    const [ci, si] = stageKey.split('_').map(Number);
    const nextSi = si + 1;
    unlocked.add(`${ci}_${nextSi}`);

    await pool.query(
      'UPDATE campaign_progress SET completed_stages = $1, unlocked_stages = $2 WHERE user_id = $3',
      [Array.from(completed), Array.from(unlocked), req.userId]
    );

    await pool.query(
      'UPDATE users SET gold = gold + $1, xp = xp + $2 WHERE id = $3',
      [goldReward || 0, xpReward || 0, req.userId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to complete stage' });
  }
});

module.exports = router;
