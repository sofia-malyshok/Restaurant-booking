const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true
  },
  tableId: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Table', tableSchema);
