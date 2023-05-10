const mongoose = require("mongoose");
const { Schema } = mongoose;

const Admin = mongoose.model(
  "Admin",
  new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);

module.exports = Admin;
