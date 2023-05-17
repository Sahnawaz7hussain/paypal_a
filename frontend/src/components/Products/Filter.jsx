import {
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Filter = () => {
  return (
    <Box w={"250px"} position={"sticky"} top={0}>
      <Heading size={["sm", "md", "md"]} mb={2}>
        Filter By Brand
      </Heading>
      <Box
        borderBottom={`2px solid ${useColorModeValue("black", "gray")}`}
        borderRadius={"10"}
      ></Box>
      <CheckboxGroup defaultValue={[]}>
        <Stack spacing={1}>
          <Checkbox value="naruto">Naruto</Checkbox>
          <Checkbox value="sasuke">Sasuke</Checkbox>
          <Checkbox value="kakashi">Kakashi</Checkbox>
          <Checkbox value="kakashi">Kakashi</Checkbox>
          <Checkbox value="kakashi">Kakashi</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Heading size={["sm", "md", "md"]} mt={5} mb={2}>
        Sort By Price
      </Heading>
      <Box
        borderBottom={`2px solid ${useColorModeValue("black", "gray")}`}
        borderRadius={"10"}
      ></Box>
      <RadioGroup defaultValue="2">
        <Stack spacing={2}>
          <Radio value="asc">Low To High</Radio>
          <Radio value="desc">High To Low</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default Filter;
