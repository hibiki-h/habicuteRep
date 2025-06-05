import { Status } from "@/types/Types";
import { Menu, Text } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";

type Props = {
  children: Status;
  setOpenDateClickDialog: Dispatch<SetStateAction<boolean>>;
  openEventClick: boolean;
  setOpenEventClick: Dispatch<SetStateAction<boolean>>;
  onClickChangeTaskStatus: (status: Status) => void;
  onClickSetStatus: (status: Status) => void;
};

const CalendarPageDialogDateClickMenuStatusItem = memo((props: Props) => {
  const {
    children,
    openEventClick,
    onClickChangeTaskStatus,
    onClickSetStatus,
    setOpenEventClick,
    setOpenDateClickDialog,
  } = props;

  return (
    <>
      <Menu.Item
        value={children}
        color={"gray.500"}
        flex={1}
        display={"flex"}
        justifyContent={"center"}
        fontSize={"clamp(14px, 1vw, 26px)"}
        w={"clamp(120px,5vw,180px)"}
        h={"clamp(60px, 2vw, 100px)"}
        onClick={() => {
          if (openEventClick) {
            onClickChangeTaskStatus(children);
          } else {
            onClickSetStatus(children);
          }
          setOpenEventClick(false);
          setOpenDateClickDialog(false);
        }}
        _hover={{
          color: "red.600",
          backgroundColor: "transparent",
        }}
        transition=".2s"
      >
        <Text>{children}</Text>
      </Menu.Item>
    </>
  );
});
export default CalendarPageDialogDateClickMenuStatusItem;
