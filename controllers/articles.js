const Article = require('../models/article');
const {
  documentNotFoundErrorHandler,
  getArticlesErrorHandlerSelector,
  getArticleByIdErrorHandlerSelector,
} = require('../errors/not-found-error');
const {
  articleDataErrorHandlerSelector,
  deleteActionFailSelector,
} = require('../errors/invalid-data-passed-error');

const {
  catchFindErrorHandler,
  catchCreateErrorHandler,
  catchFindByIdAndUpdateOrDeleteErrorHandler,
} = require('../errors/catch-errors');

module.exports.getArticles = (req, res) => {
  Article.find()
    .lean()
    .orFail(() => {
      documentNotFoundErrorHandler(getArticlesErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      catchFindErrorHandler(err, res);
    });
};

module.exports.createArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      catchCreateErrorHandler(err, res, articleDataErrorHandlerSelector);
    });
};

module.exports.deleteArticleById = (req, res) => {
  Article.findByIdAndDelete(req.params.articleId)
    .populate('owner')
    .orFail(() => {
      documentNotFoundErrorHandler(getArticleByIdErrorHandlerSelector);
    })
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      catchFindByIdAndUpdateOrDeleteErrorHandler(
        err,
        res,
        articleDataErrorHandlerSelector,
        deleteActionFailSelector,
      );
    });
};
