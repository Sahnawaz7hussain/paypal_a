import React from "react";
import Card from "../Home/Card";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";

const Products = ({
  handlePaginatinOnClick,
  currentPage,
  totalPages,
  products,
  handleOnClickAddToCart,
}) => {
  return (
    <Box>
      <SimpleGrid columns={[1, 2, 2, 3]} spacingX={[2, 2, 5]} spacingY={2}>
        {products?.length > 0 &&
          products.map((item, idx) => (
            <Card
              key={idx}
              {...item}
              handleOnClickAddToCart={handleOnClickAddToCart}
            />
          ))}
      </SimpleGrid>
      <Flex w={"fit-content"} gap={3} m={"auto"} alignItems={"center"} my={3}>
        <Button
          colorScheme="blue"
          onClick={() => handlePaginatinOnClick(-1)}
          isDisabled={currentPage <= 1}
        >
          Prev
        </Button>
        <Text>{currentPage}</Text>
        <Button
          isDisabled={currentPage >= totalPages}
          colorScheme="blue"
          onClick={() => handlePaginatinOnClick(+1)}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Products;
