import { Box, Button, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  isLoading: boolean;
  children: string;
};

const LoginSignupPasswordresetPageButton: FC<Props> = memo((props) => {
  const { isLoading, children } = props;

  return (
    <>
      <Button
        disabled={isLoading}
        type="submit"
        flexDir={"column"}
        mt={"clamp(5px, 2vw, 20px)"}
        _hover={{
          "& .image": {
            transform: "rotateX(540deg)",
          },
          "& .textcolor": {
            color: "red.600",
          },
        }}
      >
        <Box position={"relative"} top={"clamp(7px , .5vh, 10px)"}>
          <Text
            fontSize={"clamp(11px, 1vw, 30px)"}
            className="textcolor"
            transition={".5s"}
          >
            {children}
          </Text>
        </Box>
        <Box position={"relative"} left={".2vw"}>
          <Image
            src="/singup_login_page_enter_button_icon.svg"
            w={"clamp(50px, 5vw, 140px)"}
            className="image"
            style={{ transition: "transform 0.7s" }}
          />
        </Box>
      </Button>
    </>
  );
});
export default LoginSignupPasswordresetPageButton;
