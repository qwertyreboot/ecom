const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "staff"],
      default: "customer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
