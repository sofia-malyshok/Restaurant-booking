const { getTables, getAvailableTables } = require('../controllers/table');

module.exports = (router) => {
  router.route('/tables')
    .get(getTables);

  router.route('/available-tables')
    .get(getAvailableTables)
};
