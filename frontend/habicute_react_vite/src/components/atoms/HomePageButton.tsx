import { Box, Button, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children: string;
  isLoading: boolean;
};

const HomePageButton = memo((props: Props) => {
  const { children, isLoading } = props;

  return (
    <>
      <Button
        disabled={isLoading}
        position={"relative"}
        display={"flex"}
        alignItems={"center"}
        left={"25vw"}
        type="submit"
        _hover={{
          "& .child-box": {
            color: "red.600",
          },
        }}
      >
        <Box
          w={"clamp(150px,15vw,500px)"}
          position={"absolute"}
          left={"50%"}
          top={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Image src="/home_page_sendmessage_button.svg" />
        </Box>
        <Text
          className={"child-box"}
          transition={".3s"}
          position={"absolute"}
          textAlign={"center"}
          left={"50%"}
          top={"51%"}
          transform={"translate(-50%, -50%)"}
          fontSize={"clamp(12px, 1.1vw, 30px)"}
        >
          {children}
        </Text>
      </Button>
    </>
  );
});
export default HomePageButton;
