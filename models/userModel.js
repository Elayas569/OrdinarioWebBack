const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Favor de poner tu nombre"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Favor de poner tu email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Favor de poner tu contraseña"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
