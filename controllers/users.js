require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  documentNotFoundErrorHandler,
  getUsersErrorHandlerSelector,
  getUserByIdErrorHandlerSelector,
  getCurrentUserErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  catchFindErrorHandler,
  catchFindByIdErrorHandler,
  catchCreateErrorHandler,
} = require('../errors/catch-errors');
const {
  userDataErrorHandlerSelector,
} = require('../errors/invalid-data-passed-error');
const { noAuthErrorHandler } = require('../errors/no-auth-error');

module.exports.getUsers = (req, res) => {
  User.find()
    .lean()
    .orFail(() => {
      documentNotFoundErrorHandler(getUsersErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      catchFindErrorHandler(err, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .lean()
    .orFail(() => documentNotFoundErrorHandler(getUserByIdErrorHandlerSelector))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      catchFindByIdErrorHandler(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      email,
      password: hash,
    })

      .then((user) =>
        res
          .status(200)
          .send({ _id: user._id, name: user.name, email: user.email }),
      )
      .catch((err) => {
        catchCreateErrorHandler(err, res, userDataErrorHandlerSelector);
      }),
  );
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .lean()
    .orFail(() => {
      documentNotFoundErrorHandler(getCurrentUserErrorHandlerSelector);
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      catchFindErrorHandler(err, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      noAuthErrorHandler(res);
    });
};
