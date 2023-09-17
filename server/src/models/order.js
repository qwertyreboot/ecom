const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      locality: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      pincode: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        minLength: 10,
        maxLength: 10,
      },
    },
    payment: {
      id: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
