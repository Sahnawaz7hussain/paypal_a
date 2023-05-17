import React from "react";
import HeroImg from "../components/Home/HeroImg";
import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import firstImg from "../assets/1.jpg";
import secondImg from "../assets/2.jpg";
import thirdImg from "../assets/3.jpg";
import Card from "../components/Home/Card";

const Home = () => {
  return (
    <Box boxSizing="border-box" px={["2%", "5%", "5%"]}>
      <HeroImg image={firstImg} />
      <HeroImg image={secondImg} />
      <br />
      <SimpleGrid
        columns={[1, 2, 3]}
        my={30}
        spacing={["15px", "25px", "40px"]}
      >
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
      <HeroImg image={thirdImg} />
      <SimpleGrid
        columns={[1, 2, 3]}
        my={30}
        spacing={["15px", "25px", "40px"]}
      >
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </Box>
  );
};

export default Home;
