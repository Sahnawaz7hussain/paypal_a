// importing libraries
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

// importing pages
// const Home = lazy(() => import("../pages/Home"));
// const Products = lazy(() => import("../pages/Products"));

// const Product = lazy(() => import("../pages/Product"));
// const Cart = lazy(() => import("../pages/Cart"));
// const Orders = lazy(() => import("../pages/Orders"));
// const Login = lazy(() => import("../pages/Login"));
// const Signup = lazy(() => import("../pages/Signup"));

import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import AddAddress from "../pages/AddAddress";
import AdminDashboard from "../pages/AdminDashboard";

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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/address"
        element={
          <PrivateRoute>
            <AddAddress />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/admindashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoute;
