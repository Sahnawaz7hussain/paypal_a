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
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: [true, "Address id can't be empty!"],
    },

    qty: { type: Number, required: [true, "Product qty can't be empty!"] },
    status: { type: String, default: "Pending" },
    deliveryAt: {
      type: String,
      required: [true, "Delivery Date Can't be empty"],
    },
  },
  { versionKey: false, timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
