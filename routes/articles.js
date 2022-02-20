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

// returns all articles saved by the user
// GET /articles
router.get('/', getArticles);
// creates an article with the passed
// keyword, title, text, date, source, link, and image in the body
// POST /articles
router.post('/', auth, celebrateCreateArticle, createArticle);
// deletes the stored article by _id
// DELETE /articles/articleId
router.delete(
  '/:articleId',
  auth,
  celebrateDeleteArticleById,
  deleteArticleById,
);
module.exports = router;
