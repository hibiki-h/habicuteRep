import { Status } from "@/types/Types";
import { Button, Text } from "@chakra-ui/react";
import { Dispatch, memo, SetStateAction } from "react";

type Props = {
  openEventClick: boolean;
  setOpenEventClick: Dispatch<SetStateAction<boolean>>;
  onClickSetStatus: (status: Status) => void;
  onClickChangeTaskStatus: (status: Status) => void;
  setOpenDateClickTaskStatus: Dispatch<SetStateAction<boolean>>;
  statusText: Status;
};

const CalendarPageDrawerDateClickChangeStatusButton = memo((props: Props) => {
  const {
    openEventClick,
    onClickChangeTaskStatus,
    onClickSetStatus,
    setOpenEventClick,
    setOpenDateClickTaskStatus,
    statusText,
  } = props;

  return (
    <>
      <Button
        h={3}
        onClick={() => {
          if (openEventClick) {
            onClickChangeTaskStatus(statusText);
          } else {
            onClickSetStatus(statusText);
          }
          setOpenEventClick(false);
          setOpenDateClickTaskStatus(false);
        }}
        _hover={{ color: "red.600" }}
        transition=".2s"
      >
        <Text
          w={"100%"}
          textAlign={"center"}
          fontSize={"clamp(12px, 1.5vw, 32px)"}
        >
          {statusText}
        </Text>
      </Button>
    </>
  );
});
export default CalendarPageDrawerDateClickChangeStatusButton;
