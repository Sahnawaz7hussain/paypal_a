const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Can't be empty!"],
      max: [50, "Title can't be more than 50 characters"],
    },
    imgUrl: { type: String, required: [true, "Image can't be empty!"] },
    price: { type: Number, required: [true, "Price can't be empty!"] },
    brand: { type: String, default: "Missing" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
