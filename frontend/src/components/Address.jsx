import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

const FlexContainer = ({ keyy, value }) => {
  return (
    <Flex>
      <Text fontSize={keyy === "Fullname" && "xl"}>{keyy}</Text>
      <Spacer />
      <Text fontSize={keyy === "Fullname" && "xl"}>{value}</Text>
    </Flex>
  );
};

const Address = ({ address }) => {
  //  console.log("pricing: cart: ", address);
  return (
    <Stack spacing={3} w={"100%"} border={"1px solid lightgray"} p={2}>
      <FlexContainer keyy={"Fullname"} value={address?.fullname} />
      <FlexContainer keyy={"Landmark"} value={address?.landmark} />
      <FlexContainer keyy={"Street"} value={address?.street} />
      <FlexContainer keyy={"City"} value={address?.city} />
      <FlexContainer keyy={"State"} value={address?.state} />
      <FlexContainer keyy={"Zipcode"} value={address?.zipcode} />
      <FlexContainer keyy={"Mobile"} value={address?.mobile} />
    </Stack>
  );
};

export default Address;
