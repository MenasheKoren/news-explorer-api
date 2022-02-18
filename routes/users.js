const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUsers, getCurrentUser } = require('../controllers/users');

// # returns information about the logged-in user (email and name)
// GET / users / me;

router.get('/', getUsers);
router.get('/me', getCurrentUser);

module.exports = router;
