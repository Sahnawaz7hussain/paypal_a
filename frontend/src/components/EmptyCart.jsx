import { Box, Button, Container, Heading, Image } from "@chakra-ui/react";

import emptyCartImg from "../assets/empty_cart.png";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"15px"}
      my={30}
    >
      <Heading fontWeight={"normal"}>YOUR CART IS EMPTY</Heading>
      <Image
        src={emptyCartImg}
        w={["90%", "90%", "70%"]}
        alt="Your cart is empty"
      />
      <Link to="/">
        <Button w={"100%"} colorScheme="green">
          Start Shoping
        </Button>
      </Link>
    </Container>
  );
};

export default EmptyCart;
