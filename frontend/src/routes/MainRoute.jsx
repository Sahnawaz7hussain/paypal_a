import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import { Heading } from "@chakra-ui/react";

function PageNotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Heading size={"xl"}>Page Not Found</Heading>
    </div>
  );
}

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoute;
