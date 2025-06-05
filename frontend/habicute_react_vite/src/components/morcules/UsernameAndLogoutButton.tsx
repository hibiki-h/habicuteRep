import { useAuth } from "@/providers/AuthContext";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

const UsernameAndLogoutButton = memo(() => {
  const { user, logout } = useAuth();

  return (
    <>
      <Flex
        w={"100%"}
        h={"1vh"}
        px={"clamp(10px, 4vw, 220px)"}
        position={"absolute"}
        top={"clamp(0px,2.5vh,30px)"}
        justify={"space-between"}
        align={"center"}
      >
        <Text
          textAlign={"center"}
          color={"gray.600"}
          fontSize={"clamp(11px, 1.3vw, 30px)"}
        >
          <span style={{ fontWeight: "bold" }}>USER</span>: {user?.username}
        </Text>
        <Button
          onClick={() => logout()}
          _hover={{
            "& .child-box-left": {
              transform: "translateX(4px)",
            },
            "& .child-box-right": {
              transform: "translateX(-4px)",
            },
            "& .child-box-text": {
              color: "red.600",
            },
          }}
        >
          <Image
            className="child-box-left"
            transition={".2s"}
            src="button_logout_left_sideframe.svg"
            w={"clamp(5px, 1vw, 20px)"}
          />
          <Text
            mx={"clamp(0px, 0.5vw, 5px)"}
            className="child-box-text"
            transition={".5s"}
            fontSize={"clamp(11px, 1.3vw, 30px)"}
          >
            Logout
          </Text>
          <Image
            className="child-box-right"
            transition={".2s"}
            src="button_logout_right_sideframe.svg"
            w={"clamp(5px, 1vw, 20px)"}
          />
        </Button>
      </Flex>
    </>
  );
});
export default UsernameAndLogoutButton;
