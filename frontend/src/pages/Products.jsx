import React, { useEffect, useState } from "react";
import { Heading, Stack, useToast } from "@chakra-ui/react";
import ProductsList from "../components/Products/Products";
import Filter from "../components/Products/Filter";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProductActionFn } from "../Redux/productReducer/productAction";
import {
  getCartActionFn,
  postCartActionFn,
} from "../Redux/cartReducer/cartAction";

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [brand, setBrand] = useState(searchParams.getAll("brand") || null);
  const [sort, setSort] = useState(searchParams.get("_sort") || "null");
  const [page, setPage] = useState(searchParams.get("_page") || 1);
  const [queries, setQueries] = useState();

  const { isLoading, isError, products } = useSelector(
    (state) => state.productReducer
  );

  // handle brand function
  const handleOnChangeBrand = (e) => {
    setBrand(e);
  };
  // handle sort function
  const handleRadioSort = (e) => {
    setSort(e);
  };
  // handle pagination function
  const handlePaginatinOnClick = (page) => {
    setPage((pre) => Number(pre) + Number(page));
  };

  // setting queries to url;
  useEffect(() => {
    let queryParams = {};
    brand.length > 0 && (queryParams.brand = brand);
    sort !== "null" ? (queryParams._sort = sort) : delete queryParams._sort;
    page && (queryParams._page = page);
    setSearchParams(queryParams);
  }, [brand, sort, page]);

  // setting search queries from url;
  useEffect(() => {
    let newQueries = { ...queries };
    let brand = searchParams.getAll("brand") || null;
    let sort = searchParams.get("_sort") || null;
    let page = searchParams.get("_page") || null;
    brand.length > 0 ? (newQueries.brand = brand) : delete newQueries.brand;
    sort ? (newQueries._sort = sort) : delete newQueries._sort;
    page ? (newQueries._page = Number(page)) : delete newQueries._page;

    setQueries(newQueries);
  }, [location]);

  const handleOnClickAddToCart = (cartId) => {
    dispatch(postCartActionFn({ product: cartId }))
      .then((res) => {
        if (res.type === "POST_CART_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            isClosable: true,
            duration: 3000,
            status: "success",
          });
          dispatch(getCartActionFn());
        } else {
          toast({
            title: `${res.payload}`,
            isClosable: true,
            duration: 3000,
            status: "error",
          });
        }
        console.log("cart success: ", res);
      })
      .catch((err) => {
        toast({
          title: `Something went wrong please try again!`,
          isClosable: true,
          duration: 3000,
          status: "error",
        });
      });
  };

  // call get product action fn onload,
  useEffect(() => {
    dispatch(getProductActionFn(queries));
  }, [queries]);

  return (
    <>
      {isLoading ? (
        <Heading size={"2xl"}> Loading....</Heading>
      ) : (
        <Stack
          direction={"row"}
          gap={5}
          w={"100%"}
          my={10}
          boxSizing="border-box"
          px={["2%", "5%", "5%"]}
        >
          <Filter
            handleOnChangeBrand={handleOnChangeBrand}
            handleRadioSort={handleRadioSort}
            brand={brand}
            sort={sort}
          />
          <ProductsList
            handlePaginatinOnClick={handlePaginatinOnClick}
            currentPage={Number(page)}
            totalPages={products?.totalPages}
            products={products?.products}
            handleOnClickAddToCart={handleOnClickAddToCart}
          />
        </Stack>
      )}
    </>
  );
};

export default Products;
