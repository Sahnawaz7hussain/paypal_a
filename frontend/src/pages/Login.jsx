import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLoginActionFn } from "../Redux/authReducer/authAction";

const loginData = {
  email: "",
  password: "",
};

export default function Login() {
  const location = useLocation();
  const [userData, setUserData] = useState(loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const data = useSelector((state) => state.authReducer);

  const handleOnChange = (e) => {
    let { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let { email, password } = userData;
    if (!email || !password) {
      return toast({
        title: "Login Status.",
        description: "All fields are required.",
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    }
    if (!validateEmail(email)) {
      toast({
        title: "Login Status.",
        description: "Invalid Email.",
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
      return;
    }
    dispatch(userLoginActionFn(userData))
      .then((res) => {
        console.log("LOGIN: ", res);
        if (res.type === "USER_LOGIN_SUCCESS") {
          toast({
            title: "Login Status",
            description: "Login Successfull.",
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
          const navigatePath = location.state ? location.state.from : "/";
          navigate(navigatePath, { replace: true });
        } else {
          toast({
            title: "Login Status",
            description: `${res.payload}`,
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("login Err;", err);
      });
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder={"Email"}
                type="email"
                name="email"
                onChange={handleOnChange}
                value={userData.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder={"Password"}
                type="password"
                name="password"
                onChange={handleOnChange}
                value={userData.password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button
                onClick={handleLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {data.isLoading ? <Spinner /> : "Sign in"}
              </Button>
            </Stack>
            {data.isError && <Box as={"span"}>Something went wrong.</Box>}
            <Text>
              Don't have account{" "}
              <Link style={{ color: "teal" }} color={"blue"} to="/signup">
                Create your account
              </Link>{" "}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

function validateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
