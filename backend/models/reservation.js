const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Table",
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  dateOfReservation: {
    type: Date,
    default: new Date().toISOString(),
  },
  sugestions: {
    type: String,
    maxLength: 200,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);