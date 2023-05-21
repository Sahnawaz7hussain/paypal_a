const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name can't be empty!"] },
    email: {
      type: String,
      required: [true, "Email can't be empty!"],
      unique: [true, "User exist with this email!"],
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"],
      minLength: 6,
    },
    role: { type: String, default: "user" },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
