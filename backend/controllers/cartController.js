const { CartModel } = require("../models/cartModel");

// crud functions
// 1.
const addNewItemToCart = async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  const productId = req.body.product;
  try {
    const isProductPresentInCart = await CartModel.findOne({
      product: productId,
      user: userId,
    });
    if (isProductPresentInCart)
      return res.status(409).json({ message: "Already in cart!" });
    const newCartItem = CartModel({
      user: userId,
      product: productId,
    });
    await newCartItem.save();
    return res.status(200).json({ message: "Added to cart" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error Please try again!", err: err.message });
  }
};

// delete cart Item
const deleteCartItem = async (req, res) => {
  const userId = req.body.userId;
  const cartId = req.params.cartId;
  try {
    const isItemPresent =
      (await CartModel.findOne({ user: userId, _id: cartId })) || null;
    if (!isItemPresent)
      return res
        .status(404)
        .json({ message: "You are not allow to delete this item." });
    const deletedItem = await CartModel.deleteOne({
      user: userId,
      _id: cartId,
    });
    return res.status(200).json({ message: "Deleted Successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error Please try again!", err: err.message });
  }
};

// update quantity of cart item.
const updateQtyOfCartItem = async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  const cartId = req.params.cartId;
  try {
    const isItemPresent =
      (await CartModel.findOne({ user: userId, _id: cartId })) || null;
    if (!isItemPresent)
      return res
        .status(404)
        .json({ message: "You are not allow to update this item." });
    const updateCart = await CartModel.findOneAndUpdate(
      { user: userId, _id: cartId },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Updated Successfully!", cart: updateCart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error Please try again!", err: err.message });
  }
};

// get all cart item of a particular user.
const getCartItems = async (req, res) => {
  const userId = req.body.userId;
  //console.log("get cart Called: ", userId);
  try {
    const cartItems = await CartModel.find({ user: userId }).populate(
      "product"
    );
    const responseObject = {
      message: "you cart items",
      cart: cartItems,
    };
    cartItems.length > 0 &&
      (responseObject.deliveryDate = getEstimatedDeliveryDate(new Date(), 5));
    res.status(200).json(responseObject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error Please try again!", err: err.message });
  }
};

module.exports = {
  addNewItemToCart,
  deleteCartItem,
  updateQtyOfCartItem,
  getCartItems,
};

function getEstimatedDeliveryDate(currentDate, businessDays) {
  var date = new Date(currentDate);
  var count = 0;

  while (count < businessDays) {
    date.setDate(date.getDate() + 1); // Increment date by one day

    // Check if the current day is a business day (Monday to Friday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      count++;
    }
  }

  var day = date.getDate();
  var month = date.getMonth() + 1; // Months are zero-based
  var year = date.getFullYear();

  // Format day and month with leading zeros if necessary
  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;

  return formattedDay + "/" + formattedMonth + "/" + year;
}

// // Example usage:
// var currentDate = new Date(); // Current date
// var businessDays = 5; // Number of business days

// var estimatedDeliveryDate = getEstimatedDeliveryDate(currentDate, businessDays);
// console.log(estimatedDeliveryDate);
