const ReservationModel = require('../models/reservation');

module.exports = {
  createReservation: (req, res) => {
    const reservation = new ReservationModel(req.body);

    reservation.save((err, createdReservation) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(createdReservation);
      }
    }); 
  },
};