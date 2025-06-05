import { useTodo } from "@/providers/ContentProvider";
import { Box, Image, Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { memo } from "react";

const TodoPageFormClearButton = memo(() => {
  const { setFormInput, handleScroll, emptyFormInput } = useTodo();

  return (
    <>
      <Button
        aria-label="menu button"
        _hover={{
          "& .image": {
            transform: "scaleX(1.1)",
          },
          "& .text": {
            color: "red.600",
          },
        }}
        onClick={() => {
          setFormInput(emptyFormInput);
          handleScroll();
        }}
      >
        <Flex direction={"column"}>
          <Text
            fontSize={"clamp(12px, 1.3vw, 28px)"}
            position={"relative"}
            textAlign={"center"}
            transition={".3s"}
            className="text"
          >
            clearform
          </Text>
          <Box
            w={"clamp(75px, 10vw, 180px)"}
            transition={".3s"}
            className="image"
          >
            <Image src="/todo_page_form_clear_button_underline.svg" />
          </Box>
        </Flex>
      </Button>
    </>
  );
});
export default TodoPageFormClearButton;
