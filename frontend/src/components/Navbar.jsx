import React from "react";
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/perfumate.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = true;
  return (
    <Flex
      w={"100%"}
      h={"70px"}
      boxSizing="border-box"
      px={["2%", "5%", "5%"]}
      bg={"blue.800"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"7px"}
      pos={"sticky"}
      top={"0"}
      zIndex={"3"}
    >
      <Link to="/">
        <Image
          w={["60px", "90px", "90px"]}
          src={logo}
          alt="PERFUMATE"
          border={"5px"}
        />
      </Link>

      <Box w={["65%", "40%", "40%"]}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon color="gray.300" />} />
          <Input type="text" placeholder="Search here" />
        </InputGroup>
      </Box>
      <Flex alignItems={"center"} gap={"1rem"}>
        <Link to="/products">
          <Text
            display={["none", "block", "block"]}
            color={useColorModeValue("white", "white")}
          >
            Products
          </Text>
        </Link>
        <Link to="/cart">
          <Text
            display={["none", "block", "block"]}
            color={useColorModeValue("white", "white")}
          >
            {`Cart(${2})`}
          </Text>
        </Link>
        <Box display={["none", "block", "block"]}>
          <Menu>
            {!isAuth ? (
              <Link to="/login">
                <MenuButton as={Button} colorScheme="blue">
                  Login
                </MenuButton>
              </Link>
            ) : (
              <>
                <MenuButton as={Button} colorScheme="blue">
                  Profile
                </MenuButton>
                <MenuList1 />
              </>
            )}
          </Menu>
        </Box>

        <Button
          onClick={() => toggleColorMode()}
          display={["none", "block", "block"]}
          p={"0"}
        >
          {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Box onClick={onOpen} display={["block", "none", "none"]} p={"0"}>
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              <HamburgerIcon />
            </MenuButton>
            <MobileMenu />
          </Menu>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;

function MenuList1() {
  return (
    <MenuList>
      <MenuGroup title="Profile">
        <MenuItem>My Account</MenuItem>
        <Link to="/orders">
          <MenuItem>My Orders</MenuItem>
        </Link>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Danger">
        <MenuItem color={"red"}>Logout</MenuItem>
      </MenuGroup>
    </MenuList>
  );
}

function MobileMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = false;
  return (
    <MenuList>
      <MenuGroup title="Move to">
        <Link to="/products">
          <MenuItem>Products</MenuItem>
        </Link>
        <Link to="/cart">
          <MenuItem>Cart({`${2}`})</MenuItem>
        </Link>
        <Link to="/orders">
          <MenuItem>My Orders</MenuItem>
        </Link>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Profile">
        {isAuth ? (
          <MenuItem color={"red"}>Logout</MenuItem>
        ) : (
          <>
            <Link to="/user">
              <MenuItem>Login</MenuItem>
            </Link>
            <Link to="/user">
              <MenuItem>Signup</MenuItem>
            </Link>
          </>
        )}
      </MenuGroup>

      <MenuDivider />
      <MenuGroup title="Theme">
        <MenuItem onClick={toggleColorMode}>
          {colorMode === "dark" ? "Light" : "Dark"} Theme
        </MenuItem>
      </MenuGroup>
    </MenuList>
  );
}
