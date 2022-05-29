const ReservationModel = require("../models/reservation");

module.exports = {
  createReservation: (req, res) => {
    const reservation = new ReservationModel({
      ...req.body,
      user: req.user._id,
    });

    reservation.save((err, createdReservation) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(createdReservation);
      }
    });
  },

  getReservations: (req, res) => {
    ReservationModel
      .find({user: req.user._id })
      .exec((err, reservations) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(reservations);
        }
      });
  },

  deleteResevation: (req, res) => {
    ReservationModel.findByIdAndRemove(req.params.id, (err, reservation) => {
      if (!reservation || !reservation.user.equals(req.user._id)) {
        res.status(400).send('You can not delete this resevation!');
        return;
      }

      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(reservation);
      }
    });
  },
};
