const { OrderModel } = require("../models/orderModel");
const { CartModel } = require("../models/cartModel");

// all orders of specific user
const getOrdersOfUser = async (req, res) => {
  const userId = req.body.userId;

  try {
    const allorders = await OrderModel.find({ user: userId }).populate(
      "product"
    );
    res.status(200).json({ order: allorders });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error please try again!", err: err.message });
  }
};

// Adding item to order
const addNewOrder = async (req, res) => {
  const userId = req.body.userId;
  try {
    const alldata = await CartModel.find({ user: userId });

    let OrdersData = alldata.map((elem) => {
      return { product: elem.product._id, user: userId };
    });

    const newOrder = await OrderModel.insertMany(OrdersData);
    await CartModel.deleteMany({ user: userId });
    res.status(200).json({ message: "Ordered successful." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error please try again!", err: err.message });
  }
};

module.exports = { getOrdersOfUser, addNewOrder };
