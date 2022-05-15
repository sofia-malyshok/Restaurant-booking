const TableModel = require('../models/table');

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
  // getAvailibleTables()
};
