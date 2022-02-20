const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');
const {
  celebrateCreateArticle,
  celebrateDeleteArticleById,
} = require('../middleware/celebrate');

router.get('/', getArticles);
router.post('/', auth, celebrateCreateArticle, createArticle);
router.delete(
  '/:articleId',
  auth,
  celebrateDeleteArticleById,
  deleteArticleById,
);
module.exports = router;
