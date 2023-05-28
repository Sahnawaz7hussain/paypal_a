import React from "react";
import Card from "../Home/Card";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";

const Products = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Box>
      <SimpleGrid columns={[1, 2, 2, 3]} spacingX={[2, 2, 5]} spacingY={2}>
        {data.map((item) => (
          <Card key={item} />
        ))}
      </SimpleGrid>
      <Flex w={"fit-content"} gap={3} m={"auto"} alignItems={"center"} my={3}>
        <Button colorScheme="blue">Prev</Button>
        <Text>2</Text>
        <Button colorScheme="blue">Next</Button>
      </Flex>
    </Box>
  );
};

export default Products;
