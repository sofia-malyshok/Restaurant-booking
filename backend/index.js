const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const db = require("./config/test_db");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/passport");

const errorHandler = require("./middleware/errorHandler");
const setRoutes = require("./routes");

const router = express.Router();
const app = express();

app.use(compression());
app.use(helmet());
app.use(logger("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", setRoutes(router));
app.use("/api", errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/build/")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/", "index.html"));
  });
}

app.listen(process.env.PORT, async () => {
  await db.connect();
  console.log(`Restaurant Booking API is running on ${process.env.PORT} port`);
});
