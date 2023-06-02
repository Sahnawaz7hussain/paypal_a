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
// get all orders
const getAdminAllOrders = async (req, res) => {
  try {
    const allorders = await OrderModel.find()
      .populate("product")
      .populate("address")
      .populate("user", "name email role");
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
  // console.log("req body: ", req.body);
  try {
    const alldata = await CartModel.find({ user: userId });

    // console.log("all Data: ", alldata);
    let OrdersData = alldata.map((elem) => {
      return {
        product: elem.product._id,
        qty: elem.qty,
        address: req.body.address,
        deliveryAt: req.body.deliveryAt,
        user: userId,
      };
    });

    //  console.log("ordersData: ", OrdersData);
    const newOrder = await OrderModel.insertMany(OrdersData);
    await CartModel.deleteMany({ user: userId });
    res.status(200).json({ message: "Ordered successful." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error please try again!", err: err.message });
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Updated Successfully", order: updateOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error please try again!", err: err.message });
  }
};

module.exports = {
  getOrdersOfUser,
  addNewOrder,
  updateOrder,
  getAdminAllOrders,
};
