const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const Authentication = async (req, res, next) => {
  const isTokenPresent = req.headers.authorization;
  if (!isTokenPresent) {
    res.status(404).json({ msg: "User is not Authenticated" });
  } else {
    const token = isTokenPresent.split(" ")[1];

    if (token) {
      const decoded = await jwt.verify(token, secret, (err, decoded) => {
        if (err)
          return res
            .status(401)
            .json({ message: "Invalid token", err: err.message });
        if (decoded?.userId.length > 0) {
          req.body.userId = decoded.userId;
          next();
        } else {
          res.status(401).json({ message: "Invalid token" });
        }
      });
    } else {
      res.status(404).json({ msg: "User is not Authenticated" });
    }
  }
};

module.exports = { Authentication };
