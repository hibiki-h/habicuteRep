import { Box, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  children: string;
};

const TodoPageFormTitle = memo((props: Props) => {
  const { children } = props;

  return (
    <>
      <Box
        position={"relative"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box w={"clamp(300px, 30vw, 800px)"}>
          <Image src="/todo_page_section_title.svg" />
        </Box>
        <Box
          w={{ base: "250px", md: "200px", lg: "500px" }}
          display={"flex"}
          justifyContent={"center"}
          position={"absolute"}
          transform={{
            base: "translateY(-8%)",
            md: "translateY(-20%)",
            lg: "translateY(-20%)",
          }}
        >
          <Text
            fontSize={"clamp(14px, 1.2vw, 30px)"}
            textAlign={"center"}
            whiteSpace="pre-wrap"
          >
            {children}
          </Text>
        </Box>
      </Box>
    </>
  );
});
export default TodoPageFormTitle;
