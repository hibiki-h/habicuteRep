import { Box, Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router";

import NavItem from "../atoms/NavItem";
import { useState } from "react";
import UsernameAndLogoutButton from "../morcules/UsernameAndLogoutButton";
import HomePageMenuButtonDrawer from "../organisms/HomePageManuButtonDrawer";
import { useTodo } from "@/providers/ContentProvider";

const HeaderAndNav = () => {
  const [open, setOpen] = useState(false);

  const { scrollRef, containerRef } = useTodo();

  return (
    <>
      <Flex
        direction={"column"}
        align={"center"}
        width={"100vw"}
        height={"100vh"}
        position={"relative"}
        top={"2vh"}
        ref={containerRef}
        overflowX={"hidden"}
      >
        <HomePageMenuButtonDrawer open={open} setOpen={setOpen} />
        <Flex
          position={"relative"}
          top={"1vh"}
          direction={"column"}
          align={"center"}
          justify={"center"}
        >
          <Box fontSize={"clamp(20px, 3.5vw, 70px)"} ref={scrollRef}>
            HABICUTE
          </Box>
          <Box
            w={"70vw"}
            position={"relative"}
            marginY={"clamp(5px, 1vw, 30px)"}
          >
            <Image src="/headernav_title_underline.svg" />
          </Box>
        </Flex>

        <Box mt={{ md: "5", lg: "6", xl: "7" }} mb={{ md: "5", lg: "8" }}>
          <ul style={{ listStyle: "none" }}>
            <Flex
              justify={"center"}
              direction={"row"}
              justifyContent={"space-around"}
              display={{ base: "none", md: "flex" }}
              w={"clamp(20px,70vw,2500px)"}
            >
              <NavItem toLink="/home">HOME</NavItem>
              <NavItem toLink="/calendar">CALENDER</NavItem>
              <NavItem toLink="/todo">TODO</NavItem>
            </Flex>
          </ul>
        </Box>

        <UsernameAndLogoutButton />

        <Outlet />
      </Flex>
    </>
  );
};
export default HeaderAndNav;
