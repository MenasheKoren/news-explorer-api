const express = require('express');
const users = require('./users');
const articles = require('./articles');
const { createUser, login } = require('../controllers/users');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('../middleware/celebrate');

const router = express.Router();

router.post('/signup', celebrateCreateUser, createUser);
router.post('/signin', celebrateLogin, login);

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
