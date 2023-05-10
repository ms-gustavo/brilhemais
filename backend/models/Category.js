const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Category = mongoose.model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  })
);

module.exports = Category;
