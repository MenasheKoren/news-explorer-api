require('dotenv').config();
const jwt = require('jsonwebtoken');
const { NoAuthError } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw NoAuthError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw NoAuthError();
  }

  req.user = payload;

  return next();
};
