import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrderActionFn,
  updateOrderActionFn,
} from "../../Redux/orderReducer/orderAction";
import Loading from "../../components/Loading";

const FlexContainer = ({ keyy, value }) => {
  return (
    <Flex>
      <Text fontSize={keyy === "Fullname" && "xl"}>{keyy}</Text>
      <Spacer />
      <Text fontSize={keyy === "Fullname" && "xl"}>{value}</Text>
    </Flex>
  );
};

const OrdersContainer = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState();
  const { isLoading, isError, order } = useSelector(
    (state) => state.orderReducer
  );

  useEffect(() => {
    dispatch(getAdminOrderActionFn());
  }, [reload]);
  // console.log("orderData: ", ordersData);

  const handleOnChangeUpdateOrderStatus = (orderId, value, preStatus) => {
    if (!orderId || !value || !preStatus) return;
    if (value === preStatus) return;
    dispatch(updateOrderActionFn(orderId, { status: value }))
      .then((res) => {
        setReload((pre) => !pre);
      })
      .catch((err) => {
        setReload((pre) => !pre);
      });
    // console.log("upate status: ", orderId, value, preStatus);
  };

  return (
    <Box>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <Container>
          <Heading
            size={"xl"}
            fontWeight={"normal"}
            textAlign={"center"}
            color={"red"}
          >
            There is some error to fetching data please try again!
          </Heading>
        </Container>
      ) : (
        <>
          <TableContainer>
            <Table
              minW={{ md: "720px" }}
              variant="striped"
              colorScheme={useColorModeValue("blackAlpha", "blackAlpha")}
            >
              <Thead bgColor={"rgb(4,15,57)"} color="white">
                <Tr>
                  <Th color="white">Product</Th>
                  <Th color="white">Address</Th>
                  <Th color="white">User</Th>
                  <Th color="white">Status</Th>
                  <Th color="white">Order Qty</Th>
                  <Th color="white">Update Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.length > 0 &&
                  order.map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>
                          <Popover>
                            <PopoverTrigger>
                              <Text
                                maxW="140px"
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                cursor={"pointer"}
                              >
                                {item?.product?.title}
                              </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>
                                <HStack spacing={"10px"}>
                                  <Image
                                    src={item?.product?.imgUrl}
                                    w={"100px"}
                                    h={"100px"}
                                    objectFit={"cover"}
                                  />
                                  <VStack>
                                    <Heading
                                      fontWeight={"normal"}
                                      size={"22px"}
                                    >
                                      {item?.product?.title}
                                    </Heading>
                                    <Spacer />
                                    <HStack>
                                      <Text>{item?.product?.price}</Text>
                                      <Spacer />
                                      <Badge
                                        h="fit-content"
                                        colorScheme="green"
                                      >
                                        {item?.product?.brand}
                                      </Badge>
                                    </HStack>
                                  </VStack>
                                </HStack>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>

                        <Td>
                          <Popover>
                            <PopoverTrigger>
                              <Text
                                maxW="140px"
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                cursor={"pointer"}
                              >
                                {item?.address?._id}
                              </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Stack spacing={3} p={2}>
                                  <FlexContainer
                                    keyy={"Fullname"}
                                    value={item?.address?.fullname}
                                  />
                                  <FlexContainer
                                    keyy={"Landmark"}
                                    value={item?.address?.landmark}
                                  />
                                  <FlexContainer
                                    keyy={"Street"}
                                    value={item?.address?.street}
                                  />
                                  <FlexContainer
                                    keyy={"City"}
                                    value={item?.address?.city}
                                  />
                                  <FlexContainer
                                    keyy={"State"}
                                    value={item?.address?.state}
                                  />
                                  <FlexContainer
                                    keyy={"Zipcode"}
                                    value={item?.address?.zipcode}
                                  />
                                  <FlexContainer
                                    keyy={"Mobile"}
                                    value={item?.address?.mobile}
                                  />
                                </Stack>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td>
                          <Popover>
                            <PopoverTrigger>
                              <Text
                                maxW="140px"
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                cursor={"pointer"}
                              >
                                {item?.user?.name}
                              </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Stack spacing={3} p={2}>
                                  <FlexContainer
                                    keyy={"Name"}
                                    value={item?.user?.name}
                                  />
                                  <FlexContainer
                                    keyy={"Email"}
                                    value={item?.user?.email}
                                  />
                                  <FlexContainer
                                    keyy={"UniqueId"}
                                    value={item?.user?._id}
                                  />
                                </Stack>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Td>
                        <Td
                          color={
                            item?.status === "Pending"
                              ? "orange"
                              : item?.status === "Delivered"
                              ? "green"
                              : item?.status === "Dispached"
                              ? "blue"
                              : "red"
                          }
                        >
                          {item?.status}
                        </Td>
                        <Td>{item?.qty}</Td>
                        <Td>
                          <Select
                            isDisabled={
                              item?.status === "Delivered" ||
                              item?.status === "Cancelled"
                            }
                            onChange={(e) =>
                              handleOnChangeUpdateOrderStatus(
                                item?._id,
                                e.target.value,
                                item?.status
                              )
                            }
                            defaultValue={item?.status}
                            placeholder="Update Status"
                          >
                            <option
                              disabled={"Dispached" === item?.status}
                              value="Dispached"
                            >
                              Dispached
                            </option>
                            <option
                              disabled={"Pending" === item?.status}
                              value="Pending"
                            >
                              Pending
                            </option>
                            <option
                              disabled={"Delivered" === item?.status}
                              value="Delivered"
                            >
                              Delivered
                            </option>
                            <option
                              disabled={"Cancelled" === item?.status}
                              value="Cancelled"
                            >
                              Cancelled
                            </option>
                          </Select>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default OrdersContainer;
