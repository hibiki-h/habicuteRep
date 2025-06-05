import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";

import { Status, TodoListType } from "@/types/Types";
import ChangeStatusButton from "@/components/atoms/CalendarPageDrawerDateClickChangeStatusButton";
import { useTodo } from "@/providers/ContentProvider";

type Props = {
  openEventClick: boolean;
  setOpenEventClick: Dispatch<SetStateAction<boolean>>;
  newTaskInfo: TodoListType | undefined;
  onClickSetStatus: (status: Status) => void;
  onClickChangeTaskStatus: (status: Status) => void;
  setOpenDateClickTaskStatus: Dispatch<SetStateAction<boolean>>;
  onClickDeleteTask: () => void;
};

const CalendarPageDrawerDateClickChangeStatus = memo(
  ({
    openEventClick,
    setOpenEventClick,
    newTaskInfo,
    onClickSetStatus,
    onClickChangeTaskStatus,
    setOpenDateClickTaskStatus,
    onClickDeleteTask,
  }: Props) => {
    const { IncalendarDeleteTodoLists } = useTodo();

    return (
      <>
        <Flex
          width={"100%"}
          height={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          position={"relative"}
        >
          <Box
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            top={"clamp(25px,2vw,50px)"}
          >
            <Text fontSize={"clamp(16px, 1.5vw, 38px)"}>
              {newTaskInfo?.title}
            </Text>
          </Box>
          <Flex justify={"space-between"} w={"95%"}>
            <Box w={{ base: "25%", xl: "30%" }}>
              <Image src="/todo_page_frame_left_top.svg" />
            </Box>
            <Box w={{ base: "25%", xl: "30%" }}>
              <Image src="/todo_page_frame_right_top.svg" />
            </Box>
          </Flex>

          <Flex
            w={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"clamp(25px, 3vw, 70px)"}
            m={"5% 0"}
          >
            <ChangeStatusButton
              openEventClick={openEventClick}
              onClickChangeTaskStatus={onClickChangeTaskStatus}
              onClickSetStatus={onClickSetStatus}
              setOpenEventClick={setOpenEventClick}
              setOpenDateClickTaskStatus={setOpenDateClickTaskStatus}
              statusText={"Planned"}
            />

            <ChangeStatusButton
              openEventClick={openEventClick}
              onClickChangeTaskStatus={onClickChangeTaskStatus}
              onClickSetStatus={onClickSetStatus}
              setOpenEventClick={setOpenEventClick}
              setOpenDateClickTaskStatus={setOpenDateClickTaskStatus}
              statusText={"Failed"}
            />

            <ChangeStatusButton
              openEventClick={openEventClick}
              onClickChangeTaskStatus={onClickChangeTaskStatus}
              onClickSetStatus={onClickSetStatus}
              setOpenEventClick={setOpenEventClick}
              setOpenDateClickTaskStatus={setOpenDateClickTaskStatus}
              statusText={"Done"}
            />
          </Flex>

          <Box position={"absolute"} bottom={"clamp(8px,1.3vw,30px)"}>
            <Button
              h={"20px"}
              _hover={{ color: "red.600" }}
              transition=".2s"
              onClick={() => {
                onClickDeleteTask(),
                  setOpenEventClick(false),
                  newTaskInfo && IncalendarDeleteTodoLists(newTaskInfo.id);
              }}
            >
              <Text fontSize={"clamp(14px, 1.5vw, 30px)"}>Delete task</Text>
            </Button>
          </Box>

          <Flex justify={"space-between"} w={"95%"}>
            <Box w={{ base: "25%", xl: "30%" }}>
              <Image src="/todo_page_frame_left_bottom.svg" />
            </Box>
            <Box w={{ base: "25%", xl: "30%" }}>
              <Image src="/todo_page_frame_right_bottom.svg" />
            </Box>
          </Flex>
        </Flex>
      </>
    );
  }
);
export default CalendarPageDrawerDateClickChangeStatus;
