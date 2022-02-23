require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User.find()
    .lean()
    .then((data) => {
      res.status(200).send(data);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .lean()
    .orFail(() => {
      next(errors.DocumentNotFoundError());
    })
    .then((user) => res.status(200).send({ user }));
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  })

    .then((user) => res
      .status(200)
      .send({ _id: user._id, name: user.name, email: user.email }))
    .catch((err) => {
      err.code === 11000 ? next(errors.UsedEmailError()) : next(err);
    }));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .lean()
    .orFail(() => {
      next(errors.DocumentNotFoundError());
    })
    .then((user) => {
      res.status(200).send({ user });
    });
};

module.exports.login = (req, res, next) => {
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
    .catch(next);
};
