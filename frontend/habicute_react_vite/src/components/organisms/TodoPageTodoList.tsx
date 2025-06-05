import { useTodo } from "@/providers/ContentProvider";
import { Box, Button, Flex, Image, Menu, Portal, Text } from "@chakra-ui/react";
import { memo } from "react";

const TodoPageTodoList = memo(() => {
  const { todoLists, setFormInput, setTodoLists, deleteTodoListsAndTaskLists } =
    useTodo();

  const onClickEditFormInput = (id: string) => {
    const existTodo = todoLists.find((prev) => prev.id === id);
    if (existTodo) {
      setFormInput(existTodo);
    } else {
      console.log("not found todo...");
    }
  };

  const onClickDeleteTodoList = (id: string) => {
    const existWithoutTodo = todoLists.filter((prev) => prev.id !== id);
    existWithoutTodo
      ? setTodoLists(existWithoutTodo)
      : console.log("unfound exitTodo");
    deleteTodoListsAndTaskLists(id);
  };

  return (
    <>
      <Flex
        position={{ base: "relative", lg: "absolute" }}
        left={{ base: "50%", lg: "clamp(20px, 2vw ,80px)" }}
        top={{ base: "0", lg: "clamp(260px,20vw,450px)" }}
        w={{ base: "60%", lg: "clamp(280px,23vw,800px)" }}
        transform={{ base: "translateX(-50%)", lg: "inherit" }}
        direction={"column"}
        align={"center"}
        justify={"center"}
        mb={"8vw"}
      >
        {/* --------------------todolist title------------------------ */}

        <Box
          display={"flex"}
          position={"relative"}
          justifyContent={"center"}
          alignItems={"center"}
          top={"clamp(20px,3vw,60px)"}
        >
          <Text fontSize={"clamp(12px, 1.3vw, 35px)"}>TODO LIST</Text>
        </Box>
        <Flex justify={"space-between"} w={"100%"}>
          <Box w={{ base: "30%", xl: "35%" }}>
            <Image src="/todo_page_frame_left_top.svg" />
          </Box>
          <Box w={{ base: "30%", xl: "35%" }}>
            <Image src="/todo_page_frame_right_top.svg" />
          </Box>
        </Flex>

        {/* ---------------------------------------------------------- */}

        {/* --------------------menu------------------------ */}

        {todoLists.map((children, index) => (
          <Menu.Root positioning={{ placement: "bottom" }} key={index}>
            <Menu.Trigger asChild>
              <Flex
                w={"100%"}
                direction={"column"}
                align={"center"}
                justify={"center"}
                my={"clamp(5px,2vw,15px)"}
              >
                <Button h={3} _hover={{ color: "red.600" }} transition=".2s">
                  <Text
                    w={"100%"}
                    textAlign={"center"}
                    fontSize={"clamp(12px, 1.2vw, 30px)"}
                  >
                    {children.title}
                  </Text>
                </Button>
              </Flex>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bgImage={"url(/DialogMenuBgwallpaper.jpg)"}
                  bgSize={"400px 200px"}
                  bgRepeat={"repeat"}
                >
                  <Flex
                    direction={"row"}
                    w={"clamp(150px,10vw,300px)"}
                    h={"clamp(40px, 5vw, 80px)"}
                  >
                    <Menu.Item
                      value={"Delete"}
                      color={"gray.500"}
                      flex={1}
                      display={"flex"}
                      justifyContent={"center"}
                      fontSize={"clamp(12px, 1vw, 24px)"}
                      _hover={{
                        color: "red.600",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => onClickDeleteTodoList(children.id)}
                    >
                      <Text>Delete</Text>
                    </Menu.Item>
                    <Menu.Item
                      value={"Edit"}
                      color={"gray.500"}
                      fontSize={"clamp(12px, 1vw, 24px)"}
                      flex={1}
                      display={"flex"}
                      justifyContent={"center"}
                      _hover={{
                        color: "red.600",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => onClickEditFormInput(children.id)}
                    >
                      <Text>Edit</Text>
                    </Menu.Item>
                  </Flex>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ))}

        {/* ------------------------------------------------ */}

        <Flex justify={"space-between"} w={"100%"}>
          <Box w={{ base: "30%", xl: "35%" }}>
            <Image src="/todo_page_frame_left_bottom.svg" />
          </Box>
          <Box w={{ base: "30%", xl: "35%" }}>
            <Image src="/todo_page_frame_right_bottom.svg" />
          </Box>
        </Flex>
      </Flex>
    </>
  );
});
export default TodoPageTodoList;
