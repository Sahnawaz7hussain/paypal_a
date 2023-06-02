import { Button, Container, Heading, Image } from "@chakra-ui/react";

import orderConfirmedImg from "../assets/Order_confirmed.png";
import { Link } from "react-router-dom";
const OrderConfirmed = () => {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={15}
      my={20}
    >
      <Heading>Order Confirmed</Heading>
      <Image
        src={orderConfirmedImg}
        alt="Order Confirmed"
        w={["85%", "75%", "70%"]}
        borderRadius={"md"}
      />
      <Link to="/">
        <Button colorScheme="blue">Go Back To Homepage</Button>
      </Link>
    </Container>
  );
};

export default OrderConfirmed;
