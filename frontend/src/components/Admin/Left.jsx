import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { GiPerfumeBottle } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa";
import { BsCart2, BsPatchPlus } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";

const leftTabs = [
  {
    icon: FiUsers,
    text: "Users",
  },
  {
    icon: GiPerfumeBottle,
    text: "Products",
  },
  {
    icon: FaOpencart,
    text: "Orders",
  },
  {
    icon: BsCart2,
    text: "Carts",
  },
  {
    icon: MdOutlineSell,
    text: "Sells",
  },
  {
    icon: BsPatchPlus,
    text: "Add Product",
  },
];

const LeftSide = ({ fetchDataof }) => {
  const [activeTab, setActiveTab] = useState("Users");
  const handleOnClickLeftSide = (text) => {
    fetchDataof(text);
    setActiveTab(text);
  };
  return (
    <Box flex={1} boxSizing={"border-box"}>
      {leftTabs.map((item, idx) => (
        <FlexContainer
          key={idx}
          IconText={item.icon}
          text={item.text}
          handleOnClickLeftSide={handleOnClickLeftSide}
          activeTab={activeTab}
        />
      ))}
    </Box>
  );
};

export default LeftSide;

const FlexContainer = ({
  IconText,
  text,
  handleOnClickLeftSide,
  activeTab,
}) => {
  return (
    <Flex
      h={"50px"}
      w={"100%"}
      border={"1px solid gray"}
      borderRadius={"4px"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      mb={5}
      cursor={"pointer"}
      onClick={() => (activeTab !== text ? handleOnClickLeftSide(text) : null)}
      bg={
        activeTab === text
          ? useColorModeValue("blackAlpha.900", "whiteAlpha.900")
          : null
      }
      color={activeTab === text ? useColorModeValue("white", "black") : null}
    >
      <IconText />
      <Text>{text}</Text>
    </Flex>
  );
};
