const express = require("express");
const {
  getOrdersOfUser,
  addNewOrder,
  updateOrder,
  getAdminAllOrders,
} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.get("/get", getOrdersOfUser);
orderRouter.get("/admin/get", getAdminAllOrders);
orderRouter.post("/add", addNewOrder);
orderRouter.patch("/update/:orderId", updateOrder);

module.exports = { orderRouter };
