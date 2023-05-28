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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brand, setBrand] = useState(searchParams.getAll("Brand") || null);
  const [sort, setSort] = useState(searchParams.get("_sort") || null);

  const handleOnChangeBrand = (e) => {
    setBrand(e);
  };
  const handleRadioSort = (e) => {
    setSort(e);
  };
  useEffect(() => {
    let queryParams = {};
    brand.length > 0 && (queryParams.Brand = brand);
    sort && (queryParams._sort = sort);
    sort === "null" && delete queryParams._sort;
    setSearchParams(queryParams);
  }, [brand, sort]);

  return (
    <Box w={"250px"} position={"sticky"} top={0}>
      <Heading size={["sm", "md", "md"]} mb={2}>
        Filter By Brand
      </Heading>
      <Box
        borderBottom={`2px solid ${useColorModeValue("black", "gray")}`}
        borderRadius={"10"}
      ></Box>
      <CheckboxGroup onChange={handleOnChangeBrand} defaultValue={brand}>
        <Stack spacing={1}>
          <Checkbox value="Gucci">Gucci</Checkbox>
          <Checkbox value="Chanel">Chanel</Checkbox>
          <Checkbox value="Versace">Versace</Checkbox>
          <Checkbox value="Givenchy">Givenchy</Checkbox>
          <Checkbox value="Nautica">Nautica</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Heading size={["sm", "md", "md"]} mt={5} mb={2}>
        Sort By Price
      </Heading>
      <Box
        borderBottom={`2px solid ${useColorModeValue("black", "gray")}`}
        borderRadius={"10"}
      ></Box>
      <RadioGroup onChange={handleRadioSort} defaultValue={sort}>
        <Stack spacing={2}>
          <Radio name="sort" value={"null"}>
            Remove Sort
          </Radio>
          <Radio name="sort" value="asc">
            Low To High
          </Radio>
          <Radio name="sort" value="desc">
            High To Low
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default Filter;
