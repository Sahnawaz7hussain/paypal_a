import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Pricing = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let newPrice = cart?.cart?.reduce((acc, curr) => {
      return acc + curr.qty * curr.product.price;
    }, 0);
    setTotalPrice(newPrice);
  });

  //console.log("pricing: cart: ", cart, "  totalprice ;", totalPrice);
  return (
    <Stack w={"100%"} border={"0px solid blue"}>
      <Heading size={"md"}>Summary</Heading>
      <Stack spacing={3} w={"100%"} border={"1px solid lightgray"} p={2}>
        <Flex>
          <Text>Estimated</Text>
          <Spacer />
          <Text>{cart?.deliveryDate}</Text>
        </Flex>
        <Flex>
          <Text>Total Products</Text>
          <Spacer />
          <Text>{cart?.cart?.length}</Text>
        </Flex>
        <Flex>
          <Text>MRP</Text>
          <Spacer />
          <Text>{totalPrice}</Text>
        </Flex>
        <Flex>
          <Text>Delivery Fee</Text>
          <Spacer />
          <Text color={"green"} textTransform={"uppercase"}>
            FREE
          </Text>
        </Flex>
        <Divider />
        <Flex>
          <Heading size={"md"}>Total Amount</Heading>
          <Spacer />
          <Heading size={"md"}>{totalPrice}</Heading>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Pricing;
