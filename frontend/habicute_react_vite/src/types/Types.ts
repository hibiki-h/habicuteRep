import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

export type Status = "Done" | "Failed" | "Planned";

export type TodoListType = {
  id: string;
  title: string;
  title_reason?: string;
  achievement_title?: string;
  when_if?: string;
  when_then?: string;
  obstacle_if?: string;
  obstacle_then?: string;
  start?: any;
  end?: any;
  allDay?: boolean;
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  extendedProps?: {
    status?: Status;
  };
};

export type TodoContextType = {
  scrollRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  todoLists: TodoListType[];
  setTodoLists: Dispatch<SetStateAction<TodoListType[]>>;
  inCalendarTodoLists: TodoListType[];
  setInCalendarTodoLists: Dispatch<SetStateAction<TodoListType[]>>;
  formInput: TodoListType;
  setFormInput: Dispatch<SetStateAction<TodoListType>>;
  emptyFormInput: TodoListType;
  createTodoListsAndinClendarTodoLists: (input: TodoListType) => Promise<void>;
  updateTodoListsAndTaskLists: (input: TodoListType) => Promise<void>;
  deleteTodoListsAndTaskLists: (id: string) => Promise<void>;
  onClickAddOrUpdateTasks: () => void;
  IncalendarAddTodoLists: (input: TodoListType) => Promise<void>;
  IncalendarDeleteTodoLists: (id: string) => Promise<void>;
  IncalendarUpdateTodoLists: (input: TodoListType) => Promise<void>;
};

export type ContextProviderChildrenProps = {
  children: ReactNode;
};
