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
      data: Buffer,
      contentType: String,
    },
  })
);

module.exports = Category;
