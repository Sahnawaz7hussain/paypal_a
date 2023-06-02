import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getProductActionFn } from "../../Redux/productReducer/productAction";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const { isLoading, isError, products } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(getProductActionFn({ _page: page }));
  }, [page]);

  // console.log(productData, "productData");
  return (
    <Box>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <>
          <Heading size="md" color={"red"} fontWeight={"normal"}>
            Error to fetching data!
          </Heading>
        </>
      ) : (
        <>
          <TableContainer>
            <Table minW={{ md: "720px" }} variant="striped" colorScheme="blue">
              <Thead bgColor={"rgb(4,15,57)"} color="white">
                <Tr>
                  <Th color="white">Image</Th>
                  <Th color="white">Product</Th>
                  <Th color="white">Brand</Th>
                  <Th color="white">Cost</Th>
                  <Th color="white">Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products?.products?.map((e, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td maxW="40px" overflow={"hidden"}>
                        <Image src={e.imgUrl} />
                      </Td>
                      <Td maxW="320px" overflow={"hidden"}>
                        {e.title}
                      </Td>
                      <Td>{e.brand}</Td>
                      <Td>{e.price}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            deleteproduct(e._id);
                          }}
                          minW="140px"
                          maxW="140px"
                        >
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex
            w={"100%"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={3}
            my={2}
          >
            <Button
              isDisabled={products?.currentPage <= 1}
              onClick={() => setPage((pre) => pre - 1)}
              colorScheme="blue"
            >
              PREV
            </Button>
            <Text>{products?.currentPage}</Text>
            <Button
              isDisabled={products?.currentPage >= products?.totalPages}
              colorScheme="blue"
              onClick={() => setPage((pre) => pre + 1)}
            >
              NEXT
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default ProductsContainer;
