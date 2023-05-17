import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Pricing = () => {
  return (
    <Stack w={["100%", "30%"]} border={"0px solid blue"}>
      <Heading size={"md"}>Summary</Heading>
      <Stack spacing={3} w={"100%"} border={"1px solid lightgray"} p={2}>
        <Flex>
          <Text>Estimated</Text>
          <Spacer />
          <Text>23/05/2023</Text>
        </Flex>
        <Flex>
          <Text>Total Products</Text>
          <Spacer />
          <Text>3</Text>
        </Flex>
        <Flex>
          <Text>MRP</Text>
          <Spacer />
          <Text>200</Text>
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
          <Heading size={"md"}>400</Heading>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Pricing;
