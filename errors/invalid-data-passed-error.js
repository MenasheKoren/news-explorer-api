const { ERROR_CODE_400 } = require('./error-constants');

function invalidDataPassedErrorHandler(
  dataFailSelector,
  actionFailSelector,
  res,
  err,
) {
  res.status(ERROR_CODE_400).send({
    message: `${dataFailSelector} not ${actionFailSelector}. ${err}`,
  });
}

const userDataErrorHandlerSelector = 'User';
const emailDataErrorHandlerSelector = 'Email';

const articleDataErrorHandlerSelector = 'Article';

const createActionFailSelector = 'created';
const updateActionFailSelector = 'updated';
const deleteActionFailSelector = 'deleted';

module.exports = {
  invalidDataPassedErrorHandler,
  userDataErrorHandlerSelector,
  emailDataErrorHandlerSelector,
  articleDataErrorHandlerSelector,
  createActionFailSelector,
  updateActionFailSelector,
  deleteActionFailSelector,
};
