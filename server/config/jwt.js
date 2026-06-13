const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRY = '7d';

function generateToken(userId) {
  return jwt.sign({ userId, tokenId: uuidv4() }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
