const express = require("express");
const {
  getAddressOfUser,
  updateAddressOfUser,
  addNewAddress,
} = require("../controllers/addressController");

const addressRouter = express.Router();

addressRouter.get("/get", getAddressOfUser);
addressRouter.patch("/update/:addressId", updateAddressOfUser);
addressRouter.post("/add", addNewAddress);

module.exports = { addressRouter };
