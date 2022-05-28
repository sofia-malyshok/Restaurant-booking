const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 32,
    validate: {
      validator: isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 64,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    minLength: 5,
    maxLength: 32,
  },
  facebookId: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10).catch(next);
  next();
});

userSchema.methods.validatePassword = async function validatePassword(
  candidate
) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
