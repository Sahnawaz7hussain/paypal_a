const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    qty: { type: Number, default: 1 },
  },
  { versionKey: false }
);

const CartModel = mongoose.model("cart", CartSchema);

module.exports = { CartModel };
