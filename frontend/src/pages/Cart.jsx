import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import CartCard from "../components/CartCard";
import Pricing from "../components/Pricing";

const Cart = () => {
  return (
    <Stack
      direction={["column", "row"]}
      w={"100%"}
      boxSizing="border-box"
      px={["2%", "5%", "5%"]}
      pt={3}
      gap={[3, 5, 5, 10]}
      border={"3px solid green"}
    >
      {/* All CARTLIST */}
      <Stack w={["100%", "70%"]}>
        <Heading size={"md"}>Your Cart</Heading>
        <Box border={"0px solid red"}>
          {[1, 2, 3].map((itme, idx) => (
            <CartCard key={idx} />
          ))}
        </Box>
      </Stack>

      <Pricing />
    </Stack>
  );
};

export default Cart;
