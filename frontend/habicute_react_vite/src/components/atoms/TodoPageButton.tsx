import { Box, Button, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

import { useTodo } from "@/providers/ContentProvider";

type Props = {
  children: string;
};

const TodoPageButton = memo((props: Props) => {
  const { onClickAddOrUpdateTasks } = useTodo();

  const { children } = props;

  return (
    <>
      <Button
        position={"relative"}
        display={"flex"}
        alignItems={"center"}
        _hover={{
          "& .child-box": {
            color: "red.600",
          },
        }}
        onClick={() => {
          onClickAddOrUpdateTasks();
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
export default TodoPageButton;
