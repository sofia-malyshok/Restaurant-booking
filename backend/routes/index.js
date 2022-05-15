const { tablesRoute } = require('./tables');

const setRoutes = (router) => {
  tablesRoute(router);
  return router;
};

module.exports = {
  setRoutes,
};
