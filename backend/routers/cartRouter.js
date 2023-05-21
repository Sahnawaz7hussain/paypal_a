const express = require("express");
const {
  getCartItems,
  addNewItemToCart,
  deleteCartItem,
  updateQtyOfCartItem,
} = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get("/get", getCartItems);
cartRouter.get("/add", addNewItemToCart);
cartRouter.patch("/update/:cartId", updateQtyOfCartItem);
cartRouter.delete("/delete/:cartId", deleteCartItem);

module.exports = { cartRouter };
