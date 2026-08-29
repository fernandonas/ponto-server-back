const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function auth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Token nao informado.' });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token invalido.' });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido ou expirado.' });
  }
}

module.exports = auth;
