const { getTables } = require('../controllers/table');

const tablesRoute = (router) => {
  router
    .get('/tables', getTables);
  return router;
}

module.exports = {
  tablesRoute,
};
