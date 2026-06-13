const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { generateToken } = require('../config/jwt');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (id, username, email, password_hash, gold, gems, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, username, email, hashedPassword, 100, 3, new Date(), new Date()]
    );

    // Initialize collection with 3 random cards
    const cardIds = ['ember_drake', 'tidal_sprite', 'stone_golem'];
    for (const cardId of cardIds) {
      await pool.query(
        'INSERT INTO collections (id, user_id, card_id, level, xp) VALUES ($1, $2, $3, $4, $5)',
        [uuidv4(), userId, cardId, 1, 0]
      );
    }

    // Initialize campaign progress
    await pool.query(
      'INSERT INTO campaign_progress (id, user_id, completed_stages, unlocked_stages) VALUES ($1, $2, $3, $4)',
      [uuidv4(), userId, '{}', '{"0_0"}']
    );

    const token = generateToken(userId);
    res.json({ success: true, token, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ success: true, token, userId: user.id, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Guest login
router.post('/guest', async (req, res) => {
  try {
    const userId = uuidv4();
    const guestUsername = `Guest_${Math.floor(Math.random() * 9000 + 1000)}`;

    await pool.query(
      'INSERT INTO users (id, username, email, password_hash, gold, gems, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, guestUsername, `${userId}@guest.local`, '', 100, 3, new Date(), new Date()]
    );

    const cardIds = ['ember_drake', 'tidal_sprite', 'stone_golem'];
    for (const cardId of cardIds) {
      await pool.query(
        'INSERT INTO collections (id, user_id, card_id, level, xp) VALUES ($1, $2, $3, $4, $5)',
        [uuidv4(), userId, cardId, 1, 0]
      );
    }

    await pool.query(
      'INSERT INTO campaign_progress (id, user_id, completed_stages, unlocked_stages) VALUES ($1, $2, $3, $4)',
      [uuidv4(), userId, '{}', '{"0_0"}']
    );

    const token = generateToken(userId);
    res.json({ success: true, token, userId, username: guestUsername });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Guest login failed' });
  }
});

module.exports = router;
