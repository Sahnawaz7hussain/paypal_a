import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import Pricing from "../components/Pricing";
import {
  deleteCartActionFn,
  getCartActionFn,
  updateCartActionFn,
} from "../Redux/cartReducer/cartAction";
import Address from "../components/Address";
import EmptyCart from "../components/EmptyCart";
import {
  getAddressActionFn,
  updateAddressActionFn,
} from "../Redux/addressReducer/addressAction";
import OrderConfirmed from "../components/OrderConfirmed";
import { postOrderActionFn } from "../Redux/orderReducer/orderAction";
import Loading from "../components/Loading";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { isLoading, isError, cart } = useSelector(
    (state) => state.cartReducer
  );
  const { loading, error, address } = useSelector(
    (state) => state.addressReducer
  );
  const isAddress = address !== null;

  useEffect(() => {
    dispatch(getAddressActionFn());
  }, []);

  // delete cart item function
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

  // order request
  const handleOnClickOrderRequest = () => {
    const orderObject = {
      deliveryAt: cart.deliveryDate,
      address: address._id,
    };
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
    <>
      {isLoading ? (
        <Loading />
      ) : cart?.cart?.length > 0 ? (
        <Stack
          direction={["column", "row"]}
          w={"100%"}
          boxSizing="border-box"
          px={["2%", "5%", "5%"]}
          pt={3}
          gap={[3, 5, 5, 10]}
        >
          {/* All CARTLIST */}
          <Stack w={["100%", "70%"]}>
            <Heading size={"md"}>Your Cart</Heading>
            <Box border={"0px solid red"}>
              {cart?.cart?.length > 0 &&
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
          <Stack w={["100%", "30%"]}>
            <Pricing cart={cart} />

            {isAddress ? (
              <Stack w={"100%"}>
                <Heading size={"md"}>Your Address</Heading>
                <Address address={address} />
                <Flex justifyContent={"flex-end"} alignItems={"center"}>
                  <Button onClick={onOpen} colorScheme={"blue"}>
                    Edit Address
                  </Button>
                  <AddModel
                    onClose={onClose}
                    isOpen={isOpen}
                    address={address}
                    toast={toast}
                  />
                </Flex>
              </Stack>
            ) : (
              <Button onClick={() => navigate("/address")} colorScheme={"blue"}>
                Add Address
              </Button>
            )}
            <Button
              onClick={() =>
                isAddress ? navigate("/payment") : navigate("/address")
              }
              colorScheme={"orange"}
            >
              ORDER NOW
            </Button>
          </Stack>
        </Stack>
      ) : (
        <>{orderSuccess ? <OrderConfirmed /> : <EmptyCart />}</>
      )}
    </>
  );
};

export default Cart;

// update address model
const AddModel = ({ isOpen, onClose, toast }) => {
  const dispatch = useDispatch();
  // const toast = useToast();
  const address = useSelector((state) => state.addressReducer.address);
  const [addressData, setAddressData] = useState(address);

  const handleOnChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  console.log("addresData:", addressData, " address", address);
  const handleOnClickUpdateAddress = () => {
    const { fullname, landmark, street, city, state, zipcode, mobile } =
      addressData;
    if (
      !fullname ||
      !landmark ||
      !street ||
      !city ||
      !state ||
      !zipcode ||
      !mobile
    ) {
      return toast({
        title: "All fields should be filled!",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    dispatch(updateAddressActionFn(addressData._id, addressData))
      .then((res) => {
        if (res.type === "PATCH_ADDRESS_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            duration: 4000,
            isClosable: true,
            status: "success",
            position: "top",
          });
          dispatch(getAddressActionFn());
          onClose();
        } else {
          return toast({
            title: `Error found Please try again!`,
            duration: 4000,
            isClosable: true,
            status: "error",
            position: "top",
          });
        }
      })
      .catch((err) => {
        return toast({
          title: `Error found Please try again!`,
          duration: 4000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Delivery Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              rounded={"lg"}
              p={5}
              bg={useColorModeValue("gray.100", "gray.700")}
            >
              <FormControl mb={4}>
                <FormLabel htmlFor="fullname" fontWeight={"normal"}>
                  Full name
                </FormLabel>
                <Input
                  id="full-name"
                  name={"fullname"}
                  value={addressData?.fullname}
                  placeholder="Full name"
                  onChange={handleOnChangeAddress}
                />
              </FormControl>
              <Flex flexDir={["column", "row"]} mb={"15px"}>
                <FormControl mr="5%">
                  <FormLabel htmlFor="Landmark" fontWeight={"normal"}>
                    Landmark
                  </FormLabel>
                  <Input
                    id="landmark"
                    name={"landmark"}
                    value={addressData?.landmark}
                    placeholder="Landmark"
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="street" fontWeight={"normal"}>
                    Street
                  </FormLabel>
                  <Input
                    id="street"
                    name="street"
                    value={addressData?.street}
                    placeholder="Street"
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>
              </Flex>
              <Flex flexDir={["column", "row"]} mb={"15px"}>
                <FormControl mr="5%">
                  <FormLabel htmlFor="City" fontWeight={"normal"}>
                    City
                  </FormLabel>
                  <Input
                    id="city"
                    name="city"
                    value={addressData?.city}
                    placeholder="City"
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="state" fontWeight={"normal"}>
                    State
                  </FormLabel>
                  <Input
                    id="state"
                    name="state"
                    value={addressData?.state}
                    placeholder="State"
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>
              </Flex>
              <Flex flexDir={["column", "row"]} mb={"15px"}>
                <FormControl mr="5%">
                  <FormLabel htmlFor="zipcode" fontWeight={"normal"}>
                    Zipcode
                  </FormLabel>
                  <Input
                    id="zipcode"
                    type={"number"}
                    name="zipcode"
                    placeholder="Zipcode/Pincode"
                    value={addressData?.zipcode}
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="Mobile" fontWeight={"normal"}>
                    Mobile
                  </FormLabel>
                  <Input
                    id="Mobile"
                    type={"number"}
                    name="mobile"
                    value={addressData?.mobile}
                    placeholder="Mobile"
                    onChange={handleOnChangeAddress}
                  />
                </FormControl>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleOnClickUpdateAddress}>
              UPDATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
