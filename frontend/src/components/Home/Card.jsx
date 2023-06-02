import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IMAGE =
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

export default function Card({
  imgUrl,
  title,
  price,
  brand,
  _id,
  handleOnClickAddToCart,
}) {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction={"column"}
        boxSizing="border-box"
        p={5}
        border={"1px"}
        borderRadius={"5px"}
      >
        <Box h={["200px", "250px", "250px"]} w={"auto"}>
          <Image src={imgUrl} w={"100%"} h={"100%"} objectFit={"cover"} />
        </Box>

        <Flex pt={10} align={"left"}>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Spacer />
          <Badge
            colorScheme={"green"}
            fontSize={"md"}
            variant={"subtle"}
            textTransform={"uppercase"}
            h={"fit-content"}
          >
            {brand}
          </Badge>
        </Flex>
        <Flex align={"left"} alignItems={"center"}>
          <Text fontWeight={500} fontSize={"sm"}>
            ₹ {price}
          </Text>
          <Spacer />
          <Button
            onClick={() =>
              isAuth ? handleOnClickAddToCart(_id) : navigate("/login")
            }
            colorScheme="blue"
          >
            Add To Cart
          </Button>
        </Flex>
      </Stack>
    </>
  );
}
