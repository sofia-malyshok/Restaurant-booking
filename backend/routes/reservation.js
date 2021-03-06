const {
  createReservation,
  getReservations,
  deleteResevation,
} = require("../controllers/reservation");
const authenticate = require("../middleware/authenticate");

module.exports = (router) => {
  router.route("/reservation").post(authenticate, createReservation);
  router.route("/reservation").get(authenticate, getReservations);
  router.route("/reservation/:id").delete(authenticate, deleteResevation);
};
