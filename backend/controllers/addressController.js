const { AddressModel } = require("../models/addressModel");

// ADD NEW ADDRESS
const addNewAddress = async (req, res) => {
  let data = req.body;
  const userId = req.body.userId;
  try {
    const newAddress = await AddressModel.create({ ...data, user: userId });
    res.status(200).json({
      message: "New address added successfully!",
      address: newAddress,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server erro please try again!", err: err.message });
  }
};

// GET/READ ADDRESS DATA OF A USER
const getAddressOfUser = async (req, res) => {
  try {
    const address = await AddressModel.findOne({
      user: req.body.userId,
    });
    res.status(200).json({ address });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server erro please try again!", err: err.message });
  }
};

// UPDATE ADDRESS OF A PARTICULAR USER
const updateAddressOfUser = async (req, res) => {
  let data = req.body;
  const userId = req.body.userId;
  const addressId = req.params.addressId;
  try {
    const isAddress = await AddressModel.findOne({
      _id: addressId,
      user: userId,
    });
    if (!isAddress)
      return res
        .status(404)
        .json({ message: "You are not allowed to update!", err: err.message });
    const updateAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Address updated successfully!",
      address: updateAddress,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server erro please try again!", err: err.message });
  }
};

module.exports = { addNewAddress, getAddressOfUser, updateAddressOfUser };
