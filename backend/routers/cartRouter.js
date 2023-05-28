const express = require("express");
const {
  getCartItems,
  addNewItemToCart,
  deleteCartItem,
  updateQtyOfCartItem,
} = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get("/get", getCartItems);
cartRouter.post("/add", addNewItemToCart);
cartRouter.patch("/update/:cartId", updateQtyOfCartItem);
cartRouter.delete("/delete/:cartId", deleteCartItem);

module.exports = { cartRouter };
