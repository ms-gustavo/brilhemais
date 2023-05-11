const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccessorySchema = mongoose.model(
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
      description: {
        type: String,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = AccessorySchema;
