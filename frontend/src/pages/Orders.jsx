import React, { useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderActionFn,
  updateOrderActionFn,
} from "../Redux/orderReducer/orderAction";
import Loading from "../components/Loading";

const Orders = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const orderData = useSelector((state) => state.orderReducer);

  console.log("orderData: ", orderData);

  useEffect(() => {
    dispatch(getOrderActionFn());
  }, []);
  //handle order cancelling
  const handleOnClickCancelled = (id) => {
    dispatch(updateOrderActionFn(id, { status: "Cancelled" }))
      .then((res) => {
        if (res.type === "PATCH_ORDER_SUCCESS") {
          toast({
            title: "Order cancelled successfully",
            duration: 4000,
            status: "success",
            isClosable: true,
            position: "top",
          });
          dispatch(getOrderActionFn());
        } else {
          toast({
            title: "Something went wrong please try again!",
            duration: 4000,
            status: "error",
            isClosable: true,
            position: "top",
          });
        }
        //  console.log("updare order : ", res);
      })
      .catch((err) => {
        toast({
          title: "Something went wrong please try again!",
          duration: 4000,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <>
      {orderData?.isLoading ? (
        <>
          <Loading />
        </>
      ) : orderData?.isError ? (
        <>
          <Box color={"red"}>
            There is some error occured to fetching data Please try again
          </Box>
        </>
      ) : (
        <Box w={"100%"} boxSizing="border-box" px={["2%", "5%", "5%"]} my={10}>
          <Heading fontWeight={"normal"}>Your Orders</Heading>
          <SimpleGrid columns={[1, 2, 2, 4]} gap={15}>
            {orderData?.order.length > 0 &&
              orderData?.order.map((item, idx) => (
                <OrderCard
                  key={idx}
                  {...item}
                  handleOnClickCancelled={handleOnClickCancelled}
                />
              ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Orders;

const OrderCard = (props) => {
  return (
    <Box
      h={["385px", "350px"]}
      border={`1px solid ${useColorModeValue("#555555", "gray")}`}
      borderRadius={"10px"}
      p={2}
    >
      <Box w={"100%"} h={"60%"}>
        <Image
          src={props?.product.imgUrl}
          h={"90%"}
          w={"100%"}
          m={"auto"}
          objectFit={"cover"}
        />
      </Box>
      <Box h={"40%"} position={"relative"}>
        <Flex alignItems={"center"}>
          <Text fontWeight={"normal"} fontSize={"20px"}>
            {props?.product.title}
          </Text>
          <Spacer />
          <Badge h={"fit-content"} colorScheme="green">
            {props?.product.brand}
          </Badge>
        </Flex>
        <Flex alignItems={"center"} mb={2}>
          <Text>₹ {props?.product.price}</Text>
          <Spacer />
          <Text>QTY: {props?.qty}</Text>
        </Flex>
        <Flex
          alignItems={"center"}
          position={"absolute"}
          bottom={0}
          left={0}
          right={0}
        >
          <Text
            color={
              props?.status === "Pending"
                ? "orange"
                : props?.status === "Delivered"
                ? "green"
                : props?.status === "Dispached"
                ? "blue"
                : "red"
            }
          >
            status: {props?.status}
          </Text>
          <Spacer />
          <Button
            isDisabled={
              props?.status === "Cancelled" || props?.status === "Delivered"
            }
            onClick={() => props?.handleOnClickCancelled(props?._id)}
            colorScheme="red"
          >
            CANCEL ORDER
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
