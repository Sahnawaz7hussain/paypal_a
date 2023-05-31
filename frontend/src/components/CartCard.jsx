import {
  Badge,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartCard = ({
  _id,
  qty,
  product,
  handleOnClickDeleteCartItem,
  handleOnClickUpdateCartQty,
}) => {
  //console.log("cart card: ", product);
  return (
    <Stack
      direction={["column", "column", "row"]}
      mb={3}
      border={"1px solid lightgray"}
      boxSizing="border-box"
      p={2}
    >
      <Image w={["100%", "200px"]} src={product?.imgUrl} />
      <Stack>
        <Heading size={["sm", "sm", "sm"]}>{product?.title}</Heading>
        <Badge
          colorScheme="green"
          w={"fit-content"}
          textTransform={"uppercase"}
        >
          {product?.brand}
        </Badge>
        <Spacer />
        <Heading size={"sm"} fontWeight={"bold"}>
          ₹ {product?.price}
        </Heading>
      </Stack>
      <Spacer />
      <Stack direction={["row-reverse", "row-reverse", "column"]}>
        <Flex
          border={"0px solid red"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <IconButton
            variant={"outline"}
            onClick={() => handleOnClickDeleteCartItem(_id)}
            colorScheme="red"
            icon={<MdDelete fontSize={21} color="red" />}
          />
        </Flex>
        <Spacer />
        <Flex
          border={"0px solid blue"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <IconButton
            isDisabled={qty <= 1}
            onClick={() => handleOnClickUpdateCartQty(_id, Number(qty) - 1)}
            variant={"link"}
            icon={<AiOutlineMinus />}
          />
          <Text>{qty}</Text>
          <IconButton
            onClick={() => handleOnClickUpdateCartQty(_id, Number(qty) + 1)}
            variant={"link"}
            icon={<AiOutlinePlus />}
          />
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CartCard;
