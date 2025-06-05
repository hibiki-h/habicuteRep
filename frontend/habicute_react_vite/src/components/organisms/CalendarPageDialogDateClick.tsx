import {
  Box,
  Button,
  Dialog,
  Flex,
  Image,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction, useRef } from "react";
import { Link } from "react-router";

import { useTodo } from "@/providers/ContentProvider";
import { Status } from "@/types/Types";
import MenuItem from "@/components/atoms/CalendarPageDialogDateClickMenuStatusItem";

type Props = {
  openDateClickDialog: boolean;
  setOpenDateClickDialog: Dispatch<SetStateAction<boolean>>;
  openEventClick: boolean;
  setOpenEventClick: Dispatch<SetStateAction<boolean>>;
  onClickChangeTaskStatus: (status: Status) => void;
  onClickSetStatus: (status: Status) => void;
  onClickCreateTask: (id: string) => void;
};

const CalendarPageDialogDateClick = memo((props: Props) => {
  const {
    openDateClickDialog,
    setOpenDateClickDialog,
    openEventClick,
    setOpenEventClick,
    onClickChangeTaskStatus,
    onClickSetStatus,
    onClickCreateTask,
  } = props;

  const { todoLists } = useTodo();

  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Dialog.Root
        placement={"center"}
        lazyMount
        open={openDateClickDialog}
        size={"xl"}
        onOpenChange={(isOpen) => {
          setOpenDateClickDialog(isOpen.open);
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content ref={contentRef}>
              <Dialog.Body
                rounded={"md"}
                bgImage={"url(/bgwallpaper.jpg)"}
                bgSize={"400px 200px"}
                bgRepeat={"repeat"}
                
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  width={"100%"}
                  height={"100%"}
                  direction={"column"}
                >
                  <Flex
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                    position={"relative"}
                  >
                    <Flex
                      position={"relative"}
                      justify={"center"}
                      align={"center"}
                      top={"clamp(20px,2vw,50px)"}
                    >
                      <Text fontSize={"clamp(16px, 1.3vw, 35px)"}>
                        TODO LIST
                      </Text>
                    </Flex>
                    <Flex justify={"space-between"} w={"95%"}>
                      <Box w={{ base: "25%", xl: "30%" }}>
                        <Image src="/todo_page_frame_left_top.svg" />
                      </Box>
                      <Box w={{ base: "25%", xl: "30%" }}>
                        <Image src="/todo_page_frame_right_top.svg" />
                      </Box>
                    </Flex>

                    {todoLists.length > 0 ? (
                      <Flex
                        w={"100%"}
                        direction={"column"}
                        align={"center"}
                        justify={"center"}
                        gap={"clamp(25px, 3vw, 70px)"}
                        m={"5vw 0"}
                      >
                        {todoLists.map((children) => (
                          <Menu.Root
                            key={children.id}
                            positioning={{ placement: "bottom" }}
                          >
                            <Menu.Trigger asChild>
                              <Button
                                h={3}
                                onClick={() => {
                                  onClickCreateTask(children.id);
                                }}
                                _hover={{ color: "red.600" }}
                                transition=".2s"
                              >
                                <Text
                                  w={"100%"}
                                  textAlign={"center"}
                                  fontSize={"clamp(15px, 1.3vw, 32px)"}
                                >
                                  {children.title}
                                </Text>
                              </Button>
                            </Menu.Trigger>
                            <Portal container={contentRef}>
                              <Menu.Positioner>
                                <Menu.Content
                                  bgImage={"url(/DialogMenuBgwallpaper.jpg)"}
                                  bgSize={"400px 200px"}
                                  bgRepeat={"repeat"}
                                  position={"relative"}
                                  top={".5vh"}
                                >
                                  <Flex
                                    direction={{ base: "column", md: "row" }}
                                  >
                                    {(
                                      ["Planned", "Failed", "Done"] as Status[]
                                    ).map((status) => (
                                      <MenuItem
                                        key={status}
                                        children={status}
                                        openEventClick={openEventClick}
                                        onClickChangeTaskStatus={
                                          onClickChangeTaskStatus
                                        }
                                        onClickSetStatus={onClickSetStatus}
                                        setOpenEventClick={setOpenEventClick}
                                        setOpenDateClickDialog={
                                          setOpenDateClickDialog
                                        }
                                      />
                                    ))}
                                  </Flex>
                                </Menu.Content>
                              </Menu.Positioner>
                            </Portal>
                          </Menu.Root>
                        ))}
                      </Flex>
                    ) : (
                      <Text
                        textAlign={"center"}
                        fontSize={"clamp(11px, 1.3vw, 32px)"}
                        h={"100%"}
                        style={{lineHeight: 1.2}}
                      >
                        タスクが見つかりません。
                        <br />
                        下のボタンをクリックして
                        <br />
                        Todoページで作成してください。
                        <br />
                        no todotasks were found, Click the button below
                        <br />
                        to view the Todo page and create one.
                      </Text>
                    )}

                    <Flex justify={"space-between"} w={"95%"}>
                      <Box w={{ base: "25%", xl: "30%" }}>
                        <Image src="/todo_page_frame_left_bottom.svg" />
                      </Box>
                      <Box w={{ base: "25%", xl: "30%" }}>
                        <Image src="/todo_page_frame_right_bottom.svg" />
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex
                    position={"relative"}
                    bottom={"clamp(10px,2vw,40px)"}
                    direction={"row"}
                  >
                    <Box _hover={{ color: "red.600" }} transition=".2s">
                      <Text fontSize={"clamp(16px, 1.3vw, 35px)"}>
                        <Link to={"/todo"}>Edit / Create</Link>
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <Button
                  position={"absolute"}
                  right={"clamp(55px, 8vw, 80px)"}
                  top={"clamp(40px, 5vw, 60px)"}
                  transition={".4s"}
                  _hover={{
                    transform: "rotate(-180deg)",
                  }}
                  onClick={() => setOpenDateClickDialog(false)}
                >
                  <Image
                    h={"clamp(18px, 2vw, 45px)"}
                    src="/calendar_dialog_closebuttoncross_v2.svg"
                  />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
});
export default CalendarPageDialogDateClick;
