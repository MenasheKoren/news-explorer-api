const express = require('express');
const users = require('./users');
const articles = require('./articles');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('This is a test of the emergency broadcast system');
  next();
});

router.use('/users', users);
router.use('/articles', articles);

router.get('/test', (req, res) => {
  res.status(200).send('Hello World!');
});
module.exports = router;
