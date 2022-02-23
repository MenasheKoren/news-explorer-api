const Article = require('../models/article');
const errors = require('../errors/errors');

module.exports.getArticlesById = (req, res) => {
  Article.find({ owner: req.user._id })
    .lean()
    .then((data) => {
      res.status(200).send(data);
    });
};

module.exports.createArticle = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  }).then((article) => res.status(200).send({ article }));
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .orFail(() => {
      throw errors.DocumentNotFoundError();
    })
    .then((article) => {
      if (article.owner.valueOf() !== req.user._id) throw errors.InvalidOwner();
      Article.findByIdAndDelete(req.params.articleId)
        .orFail(() => {
          throw errors.DocumentNotFoundError();
        })
        .then(() => res.status(200).send({ article }));
    })
    .catch(next);
};
