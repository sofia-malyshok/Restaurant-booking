const tables = require('./tables');
const reservation = require('./reservation');

module.exports = (router) => {
  reservation(router);
  tables(router);

  return router;
};
