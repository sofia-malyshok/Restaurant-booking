const { createReservation } = require('../controllers/reservation');

module.exports = (router) => {
  router.route('/reservation')
    .post(createReservation);
};
