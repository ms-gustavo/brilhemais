const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Type = mongoose.model(
  "Type",
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

module.exports = Type;
