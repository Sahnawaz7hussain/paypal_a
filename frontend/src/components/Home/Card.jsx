import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Badge,
  Button,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

export default function Card() {
  return (
    <>
      <Stack
        direction={"column"}
        boxSizing="border-box"
        p={5}
        border={"1px"}
        borderRadius={"5px"}
      >
        <Image src={IMAGE} />

        <Flex pt={10} align={"left"}>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
            Bleu & Chanel
          </Heading>
          <Spacer />
          <Badge
            colorScheme={"green"}
            fontSize={"md"}
            variant={"subtle"}
            textTransform={"uppercase"}
          >
            Brand
          </Badge>
        </Flex>
        <Flex align={"left"} alignItems={"center"}>
          <Text fontWeight={500} fontSize={"sm"}>
            ₹ 57
          </Text>
          <Spacer />
          <Button colorScheme="blue">Add To Cart</Button>
        </Flex>
      </Stack>
    </>
  );
}
