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
  console.log("get cart Called: ", userId);
  try {
    const cartItems = await CartModel.find({ user: userId })
      .populate("product")
      .populate("user", "email name role");
    res.status(200).json({ message: "you cart items", cart: cartItems });
  } catch (err) {}
};

module.exports = {
  addNewItemToCart,
  deleteCartItem,
  updateQtyOfCartItem,
  getCartItems,
};
