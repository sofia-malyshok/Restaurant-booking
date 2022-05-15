const TableModel = require('../models/table');
const ReservationModel = require('../models/reservation');

module.exports = {
  getTables: (_, res) => {
    TableModel.find({}, (err, tables) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(tables);
      }
    }) 
  },
  getAvailableTables: async (req, res) => {
    const reservations = await ReservationModel.find({ fromDate: { $lt: req.query.to }, toDate: { $gt: req.query.from } });

    TableModel.find({ 
      _id: { $nin: reservations.map(({ table }) => table) },
      capacity: { $gte: req.query.capacity },
    }, (err, tables) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(tables);
      }
    });
  },
};
