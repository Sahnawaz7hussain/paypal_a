import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postAddressActionFn } from "../Redux/addressReducer/addressAction";

const initialAddress = {
  fullname: "",
  landmark: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  mobile: "",
};
const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [addressData, setAddressData] = useState(initialAddress);

  const handleOnChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleOnClickAddAddress = () => {
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
    dispatch(postAddressActionFn(addressData))
      .then((res) => {
        if (res.type === "POST_ADDRESS_SUCCESS") {
          toast({
            title: `${res.payload.message}`,
            isClosable: true,
            duration: 4000,
            status: "success",
            position: "top",
          });
          const navigatePath = location.state ? location.state.from : "/cart";
          navigate(navigatePath, { replace: true });
        } else {
          toast({
            title: `${res.payload.message}`,
            isClosable: true,
            duration: 4000,
            status: "error",
            position: "top",
          });
        }
      })
      .catch((err) => {
        toast({
          title: `Something went wrong please try again!`,
          isClosable: true,
          duration: 4000,
          status: "error",
          position: "top",
        });
        console.log("add err: ", err);
      });
    // setAddressData(initialAddress);
  };

  console.log("address: ", addressData);
  return (
    <Container my={30}>
      <Box rounded={"lg"} p={5} bg={useColorModeValue("gray.100", "gray.700")}>
        <Heading
          size={"lg"}
          textAlign={"center"}
          fontWeight="normal"
          mb={"30px"}
        >
          Please Add Your Delivery Address
        </Heading>
        <FormControl mb={4}>
          <FormLabel htmlFor="fullname" fontWeight={"normal"}>
            Full name
          </FormLabel>
          <Input
            id="full-name"
            name={"fullname"}
            value={addressData.fullname}
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
              value={addressData.landmark}
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
              value={addressData.street}
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
              value={addressData.city}
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
              value={addressData.state}
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
              value={addressData.zipcode}
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
              value={addressData.mobile}
              placeholder="Mobile"
              onChange={handleOnChangeAddress}
            />
          </FormControl>
        </Flex>
        <Button onClick={handleOnClickAddAddress} colorScheme={"blue"}>
          Add Address
        </Button>
      </Box>
    </Container>
  );
};

export default AddAddress;
