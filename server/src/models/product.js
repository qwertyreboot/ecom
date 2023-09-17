const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
