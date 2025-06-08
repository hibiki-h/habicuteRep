import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { memo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  DateSelectArg,
  DateSpanApi,
  DatesSetArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core/index.js";
import { Status, TodoListType } from "@/types/Types";
import dayGridPlugin from "@fullcalendar/daygrid"; // 月間カレンダー
import timeGridPlugin from "@fullcalendar/timegrid"; // 週間・日間カレンダー
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction"; // ユーザー操作対応 // 週間・日間カレンダー
import { EventImpl } from "@fullcalendar/core/internal";
import { v4 as uuidv4 } from "uuid";

import CalendarPageDialogDateClick from "../organisms/CalendarPageDialogDateClick";
import CalendarPageDialogEventClick from "../organisms/CalendarPageDialogEventClick";
import { useTodo } from "@/providers/ContentProvider";
import "@/components/pages/styles/index.css";

const Calender = memo(() => {
  const {
    todoLists,
    inCalendarTodoLists,
    setInCalendarTodoLists,
    IncalendarAddTodoLists,
    IncalendarUpdateTodoLists,
  } = useTodo();

  /*---------Fullcalendar dateClick---------*/

  const [openDateClickDialog, setOpenDateClickDialog] =
    useState<boolean>(false);
  const [openDateClickTaskStatus, setOpenDateClickTaskStatus] =
    useState<boolean>(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState<DateClickArg>();
  const [selectionInfo, setSelectionInfo] = useState<DateSelectArg>();
  const [newTaskInfo, setNewTaskInfo] = useState<TodoListType>();
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleDateClick = (dateClickInfo: DateClickArg) => {
    setSelectedDateInfo(dateClickInfo);
    setOpenDateClickDialog(true);
  };

  const handleSelectDate = (selectionInfo: any) => {
    setSelectionInfo(selectionInfo);
    setOpenDateClickDialog(true);
  };

  const onClickCreateTask = (id: string) => {
    const task = todoLists.find((todo) => todo.id === id);
    if (!task) return;

    const dateClickNewTask = {
      id: uuidv4(),
      title: task.title,
      start: selectedDateInfo?.dateStr,
      allDay: selectedDateInfo?.allDay,
    };

    const selectionNewTask = {
      id: uuidv4(),
      title: task.title,
      start: selectionInfo?.start,
      end: selectionInfo?.end,
      allDay: selectionInfo?.allDay,
    };

    if (selectionNewTask) {
      setNewTaskInfo(selectionNewTask);
    } else {
      setNewTaskInfo(dateClickNewTask);
    }
  };

  /*-----------------------------------------------------------*/

  /*---------Fullcalendar eventClick or dateClick---------*/

  const [openEventClick, setOpenEventClick] = useState<boolean>(false);

  const onClickSetStatus = (status: Status) => {
    if (!newTaskInfo) return;

    const updateNewTodo = {
      ...newTaskInfo,
      status: status,
      backgroundColor: getEventColorByStatus(status),
    };

    if (updateNewTodo) {
      setInCalendarTodoLists([...inCalendarTodoLists, updateNewTodo]);
      IncalendarAddTodoLists(updateNewTodo);
      countEachStatusEvents(inCalendarTodoLists);
      setOpenEventClick(false);
    }
  };

  /*---------------------------------------------------------------*/

  const [InfoId, setInfoId] = useState<string>();

  const handleEventClick = (info: EventClickArg) => {
    setOpenEventClick(true);
    setInfoId(info.event.id);
    setNewTaskInfo({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      backgroundColor: info.event.backgroundColor,
      extendedProps: {
        status: info.event.extendedProps.status as Status,
      },
    });
  };

  const onClickChangeTaskStatus = (status: Status) => {
    setInCalendarTodoLists((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === InfoId
          ? {
              ...todo,
              status: status,
              backgroundColor: getEventColorByStatus(status),
            }
          : todo
      )
    );
    countEachStatusEvents(inCalendarTodoLists);
  };

  /*---------------------------------------------------------------*/

  /*---------Fullcalendar task color change method---------*/

  const getEventColorByStatus = (status: string): string => {
    switch (status) {
      case "Done":
        return "#c11336";
      case "Failed":
        return "#0000cd";
      case "Planned":
        return "#696969";
      default:
        return "";
    }
  };

  /*-------------------------------------------------------*/

  /*---------Fullcalendar event changed---------*/

  const handleEventDrop = (info: EventDropArg) => {
    const event = info.event;
    const eventId = event.id;
    const eventStart = event.start;
    const eventEnd = event.end;

    IncalendarUpdateTodoLists(event);

    setInCalendarTodoLists((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === eventId
          ? { ...todo, start: eventStart, end: eventEnd }
          : todo
      )
    );
  };

  const handleEventAllow = (
    dropInfo: DateSpanApi,
    draggedEvent: EventImpl | null
  ) => {
    const isAllDayDropInfo = dropInfo.allDay;
    const isAllDayDraggedEvent = draggedEvent?.allDay;

    if (isAllDayDraggedEvent !== isAllDayDropInfo) {
      return false;
    }
    return true;
  };

  /*--------------------------------------------------*/

  /*---------Fullcalendar eventResize---------*/

  const handleEventResize = (eventResizeInfo: EventResizeDoneArg) => {
    const eventResizedInfo = eventResizeInfo.event;
    const eventResizeInfoId = eventResizeInfo.event.id;
    const eventResizedStartoInfo = eventResizeInfo.event.start;
    const eventResizedEndoInfo = eventResizeInfo.event.end;

    IncalendarUpdateTodoLists(eventResizedInfo);

    setInCalendarTodoLists((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === eventResizeInfoId
          ? {
              ...todo,
              start: eventResizedStartoInfo,
              end: eventResizedEndoInfo,
            }
          : todo
      )
    );
  };

  /*--------------------------------------------------*/

  /*---------Fullcalendar dalete task---------*/

  const onClickDeleteTask = () => {
    setInCalendarTodoLists((prevTodos) =>
      prevTodos.filter((prevTodos) => prevTodos.id !== InfoId)
    );
    countEachStatusEvents(inCalendarTodoLists);
  };

  /*--------------------------------------------------*/

  /*---------------------Achievement rate methid---------------------*/

  const [doneEventsCount, setDoneEventsCount] = useState<number>(0);
  const [plannedEventsCount, setPlannedEventsCount] = useState<number>(0);
  const [failedStatusEventsCount, setFailedStatusEventsCount] =
    useState<number>(0);
  const [doneStatusEventsAchievementRate, setDoneStatusEventsAchievementRate] =
    useState<string>("0");
  const calendarRef = useRef<FullCalendar | null>(null);

  /*---------Fullcalendar eventsSet method---------*/

  const handleEventsSet = (eventsSetInfo: TodoListType[]) => {
    console.log("activate handleEventsSet");
    if (!calendarRef.current) return; //calendarApi代入処理のnullチェックのため
    const calendarApi = calendarRef.current.getApi(); //カレンダーの情報取得や切り替えなどの操作を可能にするapiを取得
    const { currentStart, currentEnd } = calendarApi.view; //calendar表示上の開始日、終了日データをそれぞれ取得

    const filteredEvents = eventsSetInfo.filter((event) => {
      let { start, end, allDay } = event;
      if (allDay && start && !end) {
        end = new Date(start); //alldayはendを含まないためfilter処理が正常に動かない
        end.setHours(23, 59, 59, 0);
      }
      if (!start || !end) return false; //以降の複合論理式でのnullチェックのために記載
      return (
        currentStart && currentEnd && end > currentStart && start < currentEnd
      );
    });
    countEachStatusEvents(filteredEvents);
  };

  /*-------------------------------------------------------*/

  /*-----------Fullcalendar currentView event count method-----------*/

  const countEachStatusEvents = (events: TodoListType[]) => {
    const allEventsLength = events.length;

    const doneCount = events.filter(
      (event) => event.extendedProps?.status === "Done"
    ).length;
    setDoneEventsCount(doneCount);

    const plannedCount = events.filter(
      (event) => event.extendedProps?.status === "Planned"
    ).length;
    setPlannedEventsCount(plannedCount);

    const failedCount = events.filter(
      (event) => event.extendedProps?.status === "Failed"
    ).length;
    setFailedStatusEventsCount(failedCount);

    const doneStatusEventsAchievementRate =
      allEventsLength === 0 //Nanエラー回避
        ? "0"
        : ((doneCount / allEventsLength) * 100).toFixed(0);
    setDoneStatusEventsAchievementRate(doneStatusEventsAchievementRate);
  };

  /*-----------------------------------------------------------------*/

  /*-----------------------------------------------------------------*/

  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        position={"relative"}
        direction={"column"}
        w={"100vw"}
        m={"clamp(40px, 5vw, 200px) 0"}
      >
        <Flex
          direction={"row"}
          justify={"center"}
          align={"center"}
          w={"70vw"}
          position={"relative"}
        >
          <Box flex="1" maxW="clamp(30px,5vw,120px)" textAlign="right">
            <Image src="/calender_page_achievement_section_left.svg" w="120%" />
          </Box>

          <Box flex="0 1 auto" px="5%">
            <Text textAlign="center" fontSize="clamp(14px, 2vw, 50px)">
              Achievement rate
            </Text>
          </Box>

          <Box flex="1" maxW="clamp(30px,5vw,120px)" textAlign="left">
            <Image
              src="/calender_page_achievement_section_right.svg"
              w="100%"
            />
          </Box>
        </Flex>

        <Flex
          justify={"center"}
          align={"center"}
          w={"90vw"}
          gap={"clamp(30px, 10vw, 400px)"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            h={"clamp(90px, 14vw, 600px)"}
          >
            <Image src="/calender_page_achievement_section_parentheses_left.svg" />
          </Box>

          <Box>
            <Flex
              direction={"column"}
              align={"center"}
              justify={"space-between"}
              w={"100%"}
              gap={"clamp(8px, 3vw, 35px)"}
            >
              <Box>
                <Text fontSize={"clamp(12px, 1.5vw, 40px)"}>
                  {currentView === "timeGridWeek" ? "Week" : "Month"}
                </Text>
              </Box>
              <Box
                display={"flex"}
                direction={"row"}
                fontSize={"clamp(11px, 1.5vw, 35px)"}
              >
                <Text>{`${doneStatusEventsAchievementRate}%
              (Done: ${doneEventsCount} 
              Failed: ${failedStatusEventsCount} 
              Planned: ${plannedEventsCount})`}</Text>
              </Box>
            </Flex>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            h={"clamp(90px, 14vw, 600px)"}
          >
            <Image src="/calender_page_achievement_section_parentheses_right.svg" />
          </Box>
        </Flex>

        <Box m={"clamp(50px, 10vw, 150px)"} maxWidth={"85vw"}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev today next ",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={inCalendarTodoLists}
            contentHeight={"auto"} //カレンダー表示範囲の高さ」
            //fullcalendar callback※それぞれ下記発火前後のイベントデータ取得可能
            // --------------read--------------
            eventsSet={handleEventsSet} //イベントの初期化、何かしらの方法での変更時発火
            datesSet={
              (dateInfo: DatesSetArg) => setCurrentView(dateInfo.view.type) // カレンダー週・月表示変更後発火
            }
            // --------------create--------------
            longPressDelay={500} //スマホ画面時のselectやeventClickの発火までの長押し時間(s)
            selectable={true} //カレンダー内の空白部分の範囲選択許可
            dateClick={handleDateClick} //カレンダー内の空白の日付クリック時発火
            select={handleSelectDate} //カレンダー内の空白部分の範囲選択時発火
            // --------------update/delete--------------
            editable={true} //イベントドラッグ、クリック許可（eventDrop・eventResizeに関係）
            eventClick={handleEventClick} //カレンダー内の既存イベントクリック時発火
            eventDrop={handleEventDrop} //イベントドラッグ後発火
            eventResize={handleEventResize} //イベント時間の長さ（終了時間）変更後発火
            eventResizableFromStart={true} //イベント開始時間の長さ変更も許可
            eventAllow={handleEventAllow} //イベントのD＆D操作の制御
            //
          />
          {/*-----------------------dateClick Dialog-----------------------*/}

          <CalendarPageDialogDateClick
            openDateClickDialog={openDateClickDialog}
            setOpenDateClickDialog={setOpenDateClickDialog}
            openEventClick={openEventClick}
            setOpenEventClick={setOpenEventClick}
            onClickChangeTaskStatus={onClickChangeTaskStatus}
            onClickSetStatus={onClickSetStatus}
            onClickCreateTask={onClickCreateTask}
          />

          {/*----------------------------------------------------------------*/}

          {/*-----------------------eventColor Dialog-----------------------*/}

          <CalendarPageDialogEventClick
            openEventClick={openEventClick}
            setOpenEventClick={setOpenEventClick}
            openDateClickTaskStatus={openDateClickTaskStatus}
            setOpenDateClickTaskStatus={setOpenDateClickTaskStatus}
            onClickSetStatus={onClickSetStatus}
            onClickChangeTaskStatus={onClickChangeTaskStatus}
            onClickDeleteTask={onClickDeleteTask}
            newTaskInfo={newTaskInfo}
          />
        </Box>
      </Flex>
    </>
  );
});
export default Calender;
