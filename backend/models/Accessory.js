const mongoose = require("mongoose");
const { Schema } = mongoose;

const Accessory = mongoose.model(
  "Accessory",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      type: {
        type: Schema.Types.ObjectId,
        ref: "Type",
      },
      description: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

module.exports = Accessory;
