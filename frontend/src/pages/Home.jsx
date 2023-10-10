import React from "react";
import HeroImg from "../components/Home/HeroImg";
import {
  Box,
  SimpleGrid,
  Stack,
  Image,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import firstImg from "../assets/1.jpg";
import secondImg from "../assets/2.jpg";
import thirdImg from "../assets/3.jpg";
import { Link } from "react-router-dom";
import Card from "../components/Home/Card";
import { useDispatch } from "react-redux";
import {
  getCartActionFn,
  postCartActionFn,
} from "../Redux/cartReducer/cartAction";

const BrandCard = ({ imgUrl, brand }) => {
  return (
    <>
      <Link to={`/products?brand=${brand}`}>
        <Box
          h={["200px", "300px"]}
          w={["auto", "auto"]}
          overflow={"hidden"}
          boxSizing="borderBox"
        >
          <Image
            src={imgUrl}
            borderRadius={10}
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
          />
        </Box>
      </Link>
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const bestSellers = [
    {
      _id: "647a04dd55005266a0b7ad7f",
      title: "Chanel Coco Mademoiselle",
      price: 150,
      brand: "Chanel",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0534/6279/4417/products/chanel-coco-mademoiselle_669x669.png",
    },
    {
      _id: "647a04dd55005266a0b7ad9a",
      title: "NAUTICA Aua Rush Toilette",
      price: 2800,
      brand: "Nautica",
      imgUrl:
        "https://rukminim1.flixcart.com/image/416/416/xif0q/perfume/k/5/q/-original-imaggavzpduzhse6.jpeg",
    },
    {
      _id: "647a04dd55005266a0b7ad85",
      title: "Gucci Guilty",
      price: 120,
      brand: "Gucci",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0305/1601/9337/products/142414_img-5819-givenchy-l-interdit-2020-eau-de-parfum-intense_720_1024x1024.jpg",
    },
    {
      _id: "647a04dd55005266a0b7ad97",
      title: "Nautica Voyage",
      price: 100,
      brand: "Nautica",
      imgUrl:
        "https://www.aarfragrances.com/public/uploads/all/84q43QFF4sE2ZiaxRPaHR273KJZvKsWnrKYke2g4.jpg",
    },
  ];
  const topBrands = [
    {
      imgUrl:
        "https://media.gucci.com/style/White_South_0_160_316x316/1674865031/729160_99999_0099_002_100_0000_Light-Gucci-Bloom-Eau-de-Parfum-Intense-100ml.jpg",
      brand: "Gucci",
    },
    {
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0507/4501/6476/products/chanel_no_5_450x450.jpg",
      brand: "Chanel",
    },
    {
      imgUrl:
        "https://www.aarfragrances.com/public/uploads/all/84q43QFF4sE2ZiaxRPaHR273KJZvKsWnrKYke2g4.jpg",
      brand: "Nautica",
    },
    {
      imgUrl: "https://m.media-amazon.com/images/I/51kABSdV3VL._AC_UL320_.jpg",
      brand: "Versace",
    },
  ];

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
  return (
    <Box boxSizing="border-box" px={["2%", "5%", "5%"]}>
      <HeroImg image={firstImg} />
      <HeroImg image={secondImg} />
      <br />
      <Text fontSize={"2xl"}>Top Brands</Text>
      <SimpleGrid
        columns={[2, 2, 2, 4]}
        w={["100%", "100%"]}
        m={"auto"}
        mb={15}
        mt={2}
        spacing={6}
      >
        {topBrands.map((item) => (
          <BrandCard key={item.brand} imgUrl={item.imgUrl} brand={item.brand} />
        ))}
      </SimpleGrid>
      <HeroImg image={thirdImg} />
      <Text my={15} fontSize={"2xl"}>
        Best Sellers
      </Text>
      <SimpleGrid
        columns={[1, 2, 2, 4]}
        w={"100%"}
        m={"auto"}
        mb={20}
        spacing={["15px", "25px", "40px"]}
      >
        {bestSellers.map((product, idx) => (
          <Card
            key={idx}
            {...product}
            handleOnClickAddToCart={handleOnClickAddToCart}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
