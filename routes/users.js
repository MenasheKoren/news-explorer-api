const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUsers, getCurrentUser } = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getCurrentUser);

module.exports = router;
