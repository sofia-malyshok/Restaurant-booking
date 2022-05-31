const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  connect: async () => {
    mongoose
      .connect(MONGODB_URL)
      .then(() => console.log("Connected to mongoDB"))
      .catch((err) => console.error(`Connection to mongoDB failed: ${err}`));
  },
  disconnect: async () => {
    await mongoose.connection.close();
  },
};
