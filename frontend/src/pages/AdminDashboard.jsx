import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSide from "../components/Admin/Left";
import UsersContainer from "../components/Admin/UsersContainer";
import ProductsContainer from "../components/Admin/ProductsContainer";
import OrdersContainer from "../components/Admin/OrdersContainer";
import CartContainer from "../components/Admin/CartContainer";
import SellsContainer from "../components/Admin/SellsContainer";

const AdminDashboard = () => {
  const isAdmin = JSON.parse(localStorage.getItem("user")).role;
  const navigate = useNavigate();
  const [fetchingText, setFetchingText] = useState("Users");
  const fetchDataof = (text) => {
    setFetchingText(text);
    // alert(`I'm from Admin dashboard ${text}`);
  };
  useEffect(() => {
    if (isAdmin !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <Box w={"100%"} my={10} boxSizing="border-box" px={["2%", "5%", "5%"]}>
      <Flex flexDirection={["column", "row"]} gap={5}>
        <LeftSide fetchDataof={fetchDataof} />
        <Box
          flex={4}
          border={"1px solid gray"}
          maxH={"500px"}
          overflowY={"scroll"}
        >
          {fetchingText === "Users" && <UsersContainer />}
          {fetchingText === "Products" && <ProductsContainer />}
          {fetchingText === "Orders" && <OrdersContainer />}
          {fetchingText === "Carts" && <SellsContainer />}
          {fetchingText === "Sells" && <SellsContainer />}
          {fetchingText === "Add Product" && <SellsContainer />}
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
