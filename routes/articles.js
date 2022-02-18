const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');

// returns all articles saved by the user
// GET /articles
router.get('/', getArticles);
// creates an article with the passed
// keyword, title, text, date, source, link, and image in the body
// POST /articles
router.post('/', createArticle);
// deletes the stored article by _id
// DELETE /articles/articleId
router.delete('/:articleId', deleteArticleById);
module.exports = router;
