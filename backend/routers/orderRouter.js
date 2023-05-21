const express = require("express");
const {
  getOrdersOfUser,
  addNewOrder,
} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.get("/get", getOrdersOfUser);
orderRouter.post("/add", addNewOrder);

module.exports = { orderRouter };
