const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDatabase = require("./config/db");
const { userRouter } = require("./routers/userRouter");
const { cartRouter } = require("./routers/cartRouter");
const { productRouter } = require("./routers/productRouter");
const { addressRouter } = require("./routers/addressRouter");
const { Authentication } = require("./middleware/authentication");
const { orderRouter } = require("./routers/orderRouter");
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("Welcome to homepage..");
});

// HANDLING ROUTERS
app.use("/user", userRouter);
app.use("/cart", Authentication, cartRouter);
app.use("/product", productRouter);
app.use("/address", Authentication, addressRouter);
app.use("/order", Authentication, orderRouter);

// LISTENING TO SERVER
app.listen(PORT, async () => {
  try {
    console.log("connecting with database...");
    await connectDatabase;
    console.log("connected with database.");
    console.log(`server running at port:${PORT}`);
  } catch (err) {
    console.log({
      message: "unable to connect with database",
      err: err.message,
    });
  }
});
