import { Flex, Text } from "@chakra-ui/react";

const Page404 = () => {
  return (
    <Flex w={"100vw"} h={"100vh"} justify={"center"} align={"center"}>
      <Text fontSize={"clamp(14px, 2vw, 40px)"}>Sorry, Page not found...</Text>
    </Flex>
  );
};
export default Page404;
