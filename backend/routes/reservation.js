const { createReservation } = require("../controllers/reservation");
const authenticate = require("../middleware/authenticate");

module.exports = (router) => {
  router.route("/reservation").post(authenticate, createReservation);
};
