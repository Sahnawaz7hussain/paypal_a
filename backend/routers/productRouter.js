const express = require("express");
const {
  addNewProduct,
  productsList,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,
} = require("../controllers/productController");
const { Authentication } = require("../middleware/authentication");

const productRouter = express.Router();

// ADD NEW PRODUCT
productRouter.post("/add", Authentication, addNewProduct);

// UPDATE PRODUCT DETAILS
productRouter.patch("/update/:productId", Authentication, updateProduct);

// DELETE A SPECIFIC PRODUCT BY ITS ID.
productRouter.delete("/delete/:productId", Authentication, deleteProduct);

// GET SIGNLE PRODUCT
productRouter.get("/getById/:productId", getProductById);

// GET LIST OF PRODUCTION
productRouter.get("/list", productsList);
// SEARCH PRODUCTS;

productRouter.get("/search", searchProducts);

module.exports = { productRouter };
