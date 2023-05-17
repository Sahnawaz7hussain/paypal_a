import {
  Badge,
  Box,
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

const CartCard = () => {
  return (
    <Stack
      direction={["column", "column", "row"]}
      mb={3}
      border={"1px solid lightgray"}
      boxSizing="border-box"
      p={2}
    >
      <Image
        w={["100%", "200px"]}
        src={
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Stack>
        <Heading size={["sm", "md", "md"]}>Bleu ed Chanel</Heading>
        <Badge
          colorScheme="green"
          w={"fit-content"}
          textTransform={"uppercase"}
        >
          Brand
        </Badge>
        <Spacer />
        <Heading size={"sm"} fontWeight={"bold"}>
          ₹ 500
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
          <IconButton variant={"link"} icon={<AiOutlineMinus />} />
          <Text>2</Text>
          <IconButton variant={"link"} icon={<AiOutlinePlus />} />
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CartCard;
