const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(parts[1], secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });
    req.userId = decoded.id;
    next();
  });
};
