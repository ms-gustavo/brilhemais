const mongoose = require("../db/conn");
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = Admin;
