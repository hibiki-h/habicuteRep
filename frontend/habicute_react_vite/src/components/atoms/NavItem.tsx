import { Box, Button, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children: string;
  toLink: string;
};

const NavItem = memo((props: Props) => {
  const { children, toLink } = props;

  return (
    <>
      <li>
        <Button
          asChild
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          w={"clamp(80px, 20vw, 500px)"}
          justifyContent={"space-between"}
          position={"relative"}
          _hover={{
            "& .child-box-left": {
              transform: "translateX(-10px)",
            },
            "& .child-box-right": {
              transform: "translateX(10px)",
            },
            "& .child-box-text": {
              color: "red.600",
            },
          }}
        >
          <a href={toLink} style={{ padding: 0 }}>
            <Box
              className="child-box-left"
              style={{ transition: "transform 0.3s" }}
              height={"auto"}
              width={"clamp(35px , 3vw , 80px)"}
            >
              <Image src="/divider-nav_decoration_left.svg" />
            </Box>

            <Text
              className="child-box-text"
              transition={".2s"}
              fontSize={"clamp(11px , 1.2vw , 35px)"}
              textAlign={"center"}
            >
              {children}
            </Text>

            <Box
              width={"clamp(35px , 3vw , 80px)"}
              className="child-box-right"
              style={{ transition: "transform 0.3s" }}
            >
              <Image src="/divider-nav_decoration_right.svg" />
            </Box>
          </a>
        </Button>
      </li>
    </>
  );
});
export default NavItem;
