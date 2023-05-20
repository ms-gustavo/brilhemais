const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Carroussel = mongoose.model(
  "Carroussel",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Carroussel;
