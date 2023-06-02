import { Container, Image } from "@chakra-ui/react";

import LoadingImg from "../assets/Loading.gif";
const Loading = () => {
  return (
    <Container
      my={50}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image src={LoadingImg} alt="Loding Please wait a moment" />
    </Container>
  );
};

export default Loading;
