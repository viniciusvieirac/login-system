const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

function generateToken(payload = {}) {
  return jwt.sign(payload, secret, { expiresIn: '1d' }); // token válido por 1 dia
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };
