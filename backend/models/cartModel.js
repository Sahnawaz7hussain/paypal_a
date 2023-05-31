const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User can't be empty!"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product id can't be empty!"],
    },
    qty: { type: Number, default: 1 },
    deliveryDate: { type: String },
  },
  { versionKey: false }
);

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };
