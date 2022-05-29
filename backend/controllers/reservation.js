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
    ReservationModel.findByIdAndRemove(req.params.id, function (err, reservation){
      if (err) {
        console.log(err)
      }
      else{
        res.status(200).send(reservation);
      }
    });
  },
};
