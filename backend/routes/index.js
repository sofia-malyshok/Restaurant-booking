const tables = require('./tables');
const reservation = require('./reservation');
const auth = require('./auth');

module.exports = (router) => {
  reservation(router);
  tables(router);
  auth(router);

  return router;
};
