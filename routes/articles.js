const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createArticle,
  deleteArticleById,
  getArticlesById,
} = require('../controllers/articles');
const {
  celebrateCreateArticle,
  celebrateDeleteArticleById,
} = require('../middleware/celebrate');

router.get('/', auth, getArticlesById);
router.post('/', auth, celebrateCreateArticle, createArticle);
router.delete(
  '/:articleId',
  auth,
  celebrateDeleteArticleById,
  deleteArticleById,
);
module.exports = router;
