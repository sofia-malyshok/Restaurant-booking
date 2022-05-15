const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true
  },
  location: {
    type: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
    },
  },
});

module.exports = mongoose.model('Table', tableSchema);
