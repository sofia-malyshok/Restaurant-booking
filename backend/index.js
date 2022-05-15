require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const setRoutes = require('./routes');

const router = express.Router();
const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.use(cors());

router.route('/')
  .get((_, res) => {
    res.send('Welcome to Rozliczajka API');
  });

app.use(bodyParser.json());
app.use(setRoutes(router));
app.listen(process.env.PORT, () => {
  console.log(`Rozliczajka API is running on ${process.env.PORT} port`);
});
