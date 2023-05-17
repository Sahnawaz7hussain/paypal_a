import { Image, VStack } from "@chakra-ui/react";
import React from "react";

const HeroImg = ({ image }) => {
  return (
    <VStack>
      <Image w={"100%"} src={image} />
    </VStack>
  );
};

export default HeroImg;
