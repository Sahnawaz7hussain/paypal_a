const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    fullname: { type: String, required: [true, "Name can't be empty!"] },
    landmark: { type: String },
    street: { type: String, required: [true, "Street can't be empty!"] },
    city: { type: String, required: [true, "City can't be empty!"] },
    state: { type: String, required: [true, "State can't be empty!"] },
    zipcode: { type: Number, required: [true, "Zipcode can't be empty!"] },
    mobile: { type: Number, required: [true, "Mobile number can't be empty!"] },
  },
  { versionKey: false }
);

const AddressModel = mongoose.model("address", addressSchema);

module.exports = { AddressModel };
