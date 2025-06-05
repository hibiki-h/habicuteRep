import { Button, Dialog, Image, Portal } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";
import { Status, TodoListType } from "@/types/Types";
import CalendarPageDialogChangeEventColor from "./CalendarPageDialogChangeEventColor";

type Props = {
  openEventClick: boolean;
  setOpenEventClick: Dispatch<SetStateAction<boolean>>;
  openDateClickTaskStatus: boolean;
  setOpenDateClickTaskStatus: Dispatch<SetStateAction<boolean>>;
  onClickSetStatus: (status: Status) => void;
  onClickChangeTaskStatus: (status: Status) => void;
  onClickDeleteTask: () => void;
  newTaskInfo?: TodoListType;
};

const CalendarPageDialogEventClick = memo((props: Props) => {
  const {
    openEventClick,
    setOpenEventClick,
    openDateClickTaskStatus,
    setOpenDateClickTaskStatus,
    onClickSetStatus,
    onClickChangeTaskStatus,
    onClickDeleteTask,
    newTaskInfo,
  } = props;

  return (
    <>
      <Dialog.Root
        placement={"center"}
        lazyMount
        open={openEventClick || openDateClickTaskStatus}
        size={"xl"}
        onOpenChange={(isOpen) => {
          setOpenEventClick(isOpen.open);
          setOpenDateClickTaskStatus(isOpen.open);
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body
                rounded={"md"}
                bgColor={"gray.200"}
                bgImage={"url(/bgwallpaper.jpg)"}
                bgSize={"400px 200px"}
                bgRepeat={"repeat"}
              >
                <CalendarPageDialogChangeEventColor
                  openEventClick={openEventClick}
                  setOpenEventClick={setOpenEventClick}
                  newTaskInfo={newTaskInfo}
                  onClickSetStatus={onClickSetStatus}
                  onClickChangeTaskStatus={onClickChangeTaskStatus}
                  setOpenDateClickTaskStatus={setOpenDateClickTaskStatus}
                  onClickDeleteTask={onClickDeleteTask}
                />
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
export default CalendarPageDialogEventClick;
