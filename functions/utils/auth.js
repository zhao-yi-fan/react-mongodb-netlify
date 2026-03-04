const jwt = require('jsonwebtoken');

const JWT_SECRET = 'react-mongo-netlify-jwt-secret-2026';
const TOKEN_EXPIRY = '7d';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function getTokenFromEvent(event) {
  const auth = event.headers.authorization || event.headers.Authorization || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  return null;
}

function authenticate(event) {
  const token = getTokenFromEvent(event);
  if (!token) {
    return { error: '未提供认证令牌', user: null };
  }
  try {
    const decoded = verifyToken(token);
    return { error: null, user: decoded };
  } catch (err) {
    return { error: '认证令牌无效或已过期', user: null };
  }
}

module.exports = { generateToken, verifyToken, getTokenFromEvent, authenticate, JWT_SECRET };
