import React from "react";
import { Stack } from "@chakra-ui/react";
import ProductsList from "../components/Products/Products";
import Filter from "../components/Products/Filter";

const Products = () => {
  return (
    <>
      <Stack
        direction={"row"}
        gap={5}
        w={"100%"}
        my={10}
        boxSizing="border-box"
        px={["2%", "5%", "5%"]}
      >
        <Filter />
        <ProductsList />
      </Stack>
    </>
  );
};

export default Products;
