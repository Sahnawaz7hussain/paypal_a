import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
//import PayingCard from "./PayingCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postOrderActionFn } from "../Redux/orderReducer/orderAction";
import OrderConfirmed from "../components/OrderConfirmed";
import { getCartActionFn } from "../Redux/cartReducer/cartAction";
import { getAddressActionFn } from "../Redux/addressReducer/addressAction";
let methods = [
  {
    method: "upi",
    content: "UPI",
  },
  {
    method: "cod",
    content: "Cash On Delivery",
  },
];

const Payment = () => {
  const [pmethod, setPmethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiErr, setUpiErr] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cartReducer);
  const { address } = useSelector((state) => state.addressReducer);

  useEffect(() => {
    dispatch(getAddressActionFn());
    if (!isLoading && cart?.cart?.length === 0) {
      navigate("/");
      console.log("navigate to homepage...");
    }
  }, [isLoading]);

  // order request
  const handleOnClickOrderRequest = () => {
    const orderObject = {
      deliveryAt: cart.deliveryDate,
      address: address._id,
    };
    console.log("oder Object: ", orderObject);
    dispatch(postOrderActionFn(orderObject))
      .then((res) => {
        if (res.type === "POST_ORDER_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            isClosable: true,
            duration: 4000,
            status: "success",
            position: "top",
          });
          dispatch(getCartActionFn());
          setOrderSuccess(true);
        } else {
          toast({
            title: `Something went wrong please try again`,
            isClosable: true,
            duration: 4000,
            status: "error",
            position: "top",
          });
        }
      })
      .catch((err) => {
        toast({
          title: `Something went wrong please try again`,
          isClosable: true,
          duration: 4000,
          status: "error",
          position: "top",
        });
      });
  };

  return (
    <Box p={{ base: "2%", md: "5%", lg: "15%" }}>
      {!isLoading && !orderSuccess ? (
        <Box
          display={{ base: "block", md: "flex", xl: "flex" }}
          m="auto"
          rounded={"5px"}
          border={"1px solid lightgray"}
        >
          {/* ///////////////////////////////////////////////////  */}

          <Box
            w={{ base: "100%", md: "30%", xl: "30%" }}
            display={{ base: "flex", md: "block", xl: "block" }}
            // border={"1px solid black"}
          >
            {methods.map((el) => {
              return (
                <>
                  <RadioGroup
                    key={el.method}
                    onChange={setPmethod}
                    value={pmethod}
                  >
                    <Flex
                      key={el.method}
                      onClick={() => setPmethod(el.method)}
                      h="70px"
                      bg={pmethod === `${el.method}` ? "gray" : ""}
                      alignItems={"center"}
                      cursor={"pointer"}
                      borderBottom="1px solid lightgrey"
                      // border="2px solid grey"
                    >
                      <Radio ml="15px" value={el.method}>
                        {el.content}
                      </Radio>
                    </Flex>
                  </RadioGroup>
                </>
              );
            })}
          </Box>
          {/* ///////////////////////////////////////////////////  */}
          <Spacer />
          <Box
            w={{ base: "100%", md: "65%", xl: "65%" }}
            border={"0px solid blue"}
          >
            {/* {pmethod === "card" && <PayingCard />} */}
            {pmethod === "cod" && (
              <Box boxSizing="border-box" p="20px" mt="15px ">
                <Heading mt="15px" size={"md"} color={"green"}>
                  Payable amount ₹{getTotalPrice(cart)}
                </Heading>
                <Button
                  onClick={handleOnClickOrderRequest}
                  _hover={{ colorScheme: "red" }}
                  mt={"50px"}
                  colorScheme="blue"
                  rounded={"none"}
                  w="100%"
                >
                  PLACE ORDER
                </Button>
              </Box>
            )}

            {pmethod === "upi" && (
              <Box boxSizing="border-box" p="20px" mt="15px ">
                <Heading my="15px" size={"md"} color={"green"}>
                  Payable amount ₹{getTotalPrice(cart)}
                </Heading>
                <Input
                  variant={"flushed"}
                  placeholder="user@bankname"
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    upiId.length < 8 ? setUpiErr(true) : setUpiErr(false);
                  }}
                />
                <Text color={"gray"} fontSize={"sm"}>
                  A payment reqest will be sent to this UPI ID
                </Text>
                {upiErr && (
                  <Box color={"red"} fontSize={"12px"}>
                    Upi required
                  </Box>
                )}
                <Button
                  my={"19px"}
                  colorScheme="blue"
                  rounded={"none"}
                  w="100%"
                  isDisabled={upiErr || upiId.length < 8}
                  onClick={handleOnClickOrderRequest}
                >
                  Pay
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <OrderConfirmed />
      )}
    </Box>
  );
};

export default Payment;

function getTotalPrice(cart) {
  let newPrice = cart?.cart?.reduce((acc, curr) => {
    return acc + curr.qty * curr.product.price;
  }, 0);
  //console.log("New Price : ", newPrice, "   cart price: ", cart);

  return newPrice;
}
