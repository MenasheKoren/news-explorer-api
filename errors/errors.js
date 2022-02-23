module.exports.PageNotFoundError = () => {
  const error = new Error('Requested page not found');
  error.statusCode = 404;
  error.name = 'PageNotFound';
  return error;
};
module.exports.DocumentNotFoundError = () => {
  const error = new Error('Requested article not found');
  error.statusCode = 404;
  error.name = 'DocumentNotFoundError';
  return error;
};
module.exports.CastError = () => {
  const error = new Error('Bad request');
  error.statusCode = 400;
  error.name = 'CastError';
  return error;
};

module.exports.NoAuthError = () => {
  const error = new Error('Authorization Required');
  error.statusCode = 401;
  error.name = 'AuthorizationError';
  return error;
};

module.exports.UsedEmailError = () => {
  const error = new Error('This email is already being used');
  error.statusCode = 409;
  error.name = 'emailUsed';
  return error;
};
module.exports.InvalidDataPassedError = () => {
  const error = new Error('Incorrect email or password');
  error.statusCode = 401;
  error.name = 'AuthenticationError';
  return error;
};

module.exports.InvalidOwner = () => {
  const error = new Error(
    'You cannot delete articles that do not belong to you',
  );
  error.statusCode = 401;
  error.name = 'AuthenticationError';
  return error;
};
module.exports.ServerError = () => {
  const error = new Error('An error has occurred on the server');
  error.statusCode = 500;
  error.name = 'ServerError';
  return error;
};
