const { isCelebrateError } = require('celebrate');
const { ServerError } = require('./errors');

module.exports = function errorHandler(err, req, res, next) {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const {
      details: [errorDetails],
    } = errorBody;
    const celebrateErr = new Error(`${errorDetails.message}`);
    celebrateErr.statusCode = 400;
    celebrateErr.name = 'ValidationError';

    res.status(celebrateErr.statusCode).send({ message: celebrateErr.message });
  } else if (err.message && err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    errorHandler(ServerError(), req, res, next);
  }

  next();
};
