const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUsers, getCurrentUser } = require('../controllers/users');

// # returns information about the logged-in user (email and name)
// GET / users / me;

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);

module.exports = router;
