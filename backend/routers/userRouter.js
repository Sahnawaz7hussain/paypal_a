const express = require("express");
const { Authentication } = require("../middleware/authentication");
const {
  signup,
  login,
  getAllUser,
  updateUserRole,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/getall", Authentication, getAllUser);
userRouter.patch("/update/:reqId", Authentication, updateUserRole);

module.exports = { userRouter };
