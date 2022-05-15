const { getTables } = require('../controllers/table');

module.exports = (router) => {
  router.route('/tables')
    .get(getTables);
};
