const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Userid can't be empty!"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "Product id can't be empty!"],
    },
    qty: { type: Number, default: 1 },
    status: { type: String, default: "Pending" },
    date: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
