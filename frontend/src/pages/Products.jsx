import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import ProductsList from "../components/Products/Products";
import Filter from "../components/Products/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProductActionFn } from "../Redux/productReducer/productAction";

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [queries, setQueries] = useState({});

  const productData = useSelector((state) => state.productReducer);
  // setting search queries
  useEffect(() => {
    let newQueries = { ...queries };
    let brand = searchParams.getAll("Brand") || null;
    let sort = searchParams.get("_sort") || null;
    brand && (newQueries.Brand = brand);
    sort && (newQueries._sort = sort);
    sort === null && delete newQueries._sort;
    setQueries(newQueries);
  }, [location]);

  // call get product action fn onload,
  useEffect(() => {
    dispatch(getProductActionFn(queries));
  }, []);
  console.log("productData: : ", productData);

  return (
    <>
      <Stack
        direction={"row"}
        gap={5}
        w={"100%"}
        my={10}
        boxSizing="border-box"
        px={["2%", "5%", "5%"]}
      >
        <Filter />
        <ProductsList />
      </Stack>
    </>
  );
};

export default Products;
