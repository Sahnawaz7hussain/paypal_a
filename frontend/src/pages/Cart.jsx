import { Box, Heading, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import CartCard from "../components/CartCard";
import Pricing from "../components/Pricing";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartActionFn,
  getCartActionFn,
  updateCartActionFn,
} from "../Redux/cartReducer/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isLoading, isError, cart } = useSelector(
    (state) => state.cartReducer
  );
  const handleOnClickDeleteCartItem = (cartId) => {
    dispatch(deleteCartActionFn(cartId))
      .then((res) => {
        if (res.type === "DELETE_CART_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            duration: 3000,
            isClosable: true,
            status: "success",
          });
        } else {
          toast({
            title: "Not able delete!",
            duration: 3000,
            isClosable: true,
            status: "error",
          });
        }
        dispatch(getCartActionFn());
        // console.log("dlete: cart res: ", res);
      })
      .catch((err) => {
        toast({
          title: "Not able delete!",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
        dispatch(getCartActionFn());
        // console.log("delete: cart err: ", err);
      });
  };

  // update cart qty;
  const handleOnClickUpdateCartQty = (cartId, qty) => {
    dispatch(updateCartActionFn(cartId, { qty }))
      .then((res) => {
        if (res.type === "PATCH_CART_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            isClosable: true,
            duration: 3000,
            status: "success",
          });
        } else {
          toast({
            title: `Something went wrong please try again!`,
            isClosable: true,
            status: "error",
            duration: 3000,
          });
        }
        dispatch(getCartActionFn());
        //console.log("update succes: ", res);
      })
      .catch((err) => {
        toast({
          title: `Something went wrong please try again!`,
          isClosable: true,
          status: "error",
          duration: 3000,
        });
        dispatch(getCartActionFn());
        // console.log("update err: ", err);
      });
  };
  return (
    <>
      {isLoading ? (
        <Heading size={"2xl"}>Loading Carts...</Heading>
      ) : (
        <Stack
          direction={["column", "row"]}
          w={"100%"}
          boxSizing="border-box"
          px={["2%", "5%", "5%"]}
          pt={3}
          gap={[3, 5, 5, 10]}
          border={"3px solid green"}
        >
          {/* All CARTLIST */}
          <Stack w={["100%", "70%"]}>
            <Heading size={"md"}>Your Cart</Heading>
            <Box border={"0px solid red"}>
              {cart?.cart.length > 0 &&
                cart?.cart.map((cart, idx) => (
                  <CartCard
                    key={idx}
                    {...cart}
                    handleOnClickDeleteCartItem={handleOnClickDeleteCartItem}
                    handleOnClickUpdateCartQty={handleOnClickUpdateCartQty}
                  />
                ))}
            </Box>
          </Stack>

          <Pricing cart={cart} />
        </Stack>
      )}
    </>
  );
};

export default Cart;
