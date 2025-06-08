import {
  createContext,
  FC,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ContextProviderChildrenProps,
  TodoContextType,
  TodoListType,
} from "@/types/Types";
import AxiosInstance from "@/api/todoListsApi";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("TodoListContxt is not found");
  return context;
};

export const TodoProvider: FC<ContextProviderChildrenProps> = memo(
  (props: ContextProviderChildrenProps) => {
    const { token } = useAuth();
    const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
    const [inCalendarTodoLists, setInCalendarTodoLists] = useState<
      TodoListType[]
    >([]);

    //fetch of api
    const fetchTask = async (
      method: "post" | "get" | "put" | "delete",
      url: string,
      data: TodoListType | TodoListType[] | undefined = undefined
    ) => {
      if (!token) {
        console.warn("No token found! redirectiong to login...");
        return;
      }
      try {
        const response = await AxiosInstance.request({
          method,
          url,
          headers: { Authorization: `Bearer ${token}` },
          ...(method !== "get" && { data }),
        });
        console.log(`${method.toUpperCase()} success :`, response.data);
        return response.data;
      } catch (error) {
        console.error(`${method.toUpperCase()} failed:`, error);
      }
    };

    // get method of inCalendarTodoLists and todoLists

    useEffect(() => {
      getTodoListsAndIncalendarTodoLists();
    }, []);

    const getTodoListsAndIncalendarTodoLists = async () => {
      const tasksData = await fetchTask("get", "api/tasks/");
      const todolistsData = await fetchTask("get", "api/calendartasks/");
      setTodoLists(tasksData);
      setInCalendarTodoLists(todolistsData);
    };

    // create method of inCalendarTodoLists and todoLists

    const createTodoListsAndinClendarTodoLists = async (
      input: TodoListType
    ) => {
      await fetchTask("post", "api/tasks/", input);
    };

    const IncalendarAddTodoLists = async (input: TodoListType) => {
      await fetchTask("post", "api/calendartasks/", input);
    };

    // update and create method of todoLists

    const emptyFormInput = {
      id: "",
      title: "",
      title_reason: "",
      achievement_title: "",
      when_if: "",
      when_then: "",
      obstacle_if: "",
      obstacle_then: "",
    };

    const onClickAddOrUpdateTasks = () => {
      const { id, ...newTodo } = formInput;

      const isAllFilled = Object.values(newTodo).every((value) => value !== "");

      if (!isAllFilled) {
        window.alert(`Please enter all content \n すべて入力してください`);
        return;
      }

      if (id) {
        const updatedFormInput = {
          ...todoLists.find((todo) => todo.id === formInput.id),
          ...formInput,
        };

        updateTodoListsAndTaskLists(updatedFormInput);
        window.alert(`Update todo list!! \n 更新完了`);
        setTodoLists((prev) =>
          prev.map((todo) =>
            todo.id === updatedFormInput.id
              ? { ...todo, ...updatedFormInput }
              : todo
          )
        );
      } else {
        const newTodo = {
          ...formInput,
          id: uuidv4(),
        };
        createTodoListsAndinClendarTodoLists(newTodo);
        setTodoLists((prev) => [...prev, newTodo]);
        window.alert(`Add todo list!! \n 追加完了`);
      }
      setFormInput(emptyFormInput);
      handleScroll();
    };

    // update method of inCalendarTodoLists and todoLists

    const [formInput, setFormInput] = useState<TodoListType>({
      id: "",
      title: "",
      title_reason: "",
      achievement_title: "",
      when_if: "",
      when_then: "",
      obstacle_if: "",
      obstacle_then: "",
    });

    const updateTodoListsAndTaskLists = async (input: TodoListType) => {
      await fetchTask("put", `api/tasks/${input.id}/`, input);
    };

    const IncalendarUpdateTodoLists = async (input: TodoListType) => {
      await fetchTask("put", `api/calendartasks/${input.id}/`, input);
    };

    // delete method of inCalendarTodoLists and todoLists

    const deleteTodoListsAndTaskLists = async (id: string) => {
      await fetchTask("delete", `api/tasks/${id}/`);
      setFormInput((prev) => ({
        ...prev,
        id: "", //idを空にする事で、onClickAddOrUpdateTasksで更新の処理にいかないようにして既存のforminputの入力はユーザーが削除したタスクベースで内容を編集できるように残す
      }));
    };

    const IncalendarDeleteTodoLists = async (id: string) => {
      await fetchTask("delete", `api/calendartasks/${id}/`);
    };

    // scroll

    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
      if (scrollRef.current && containerRef.current) {
        containerRef.current.scroll({
          top: scrollRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    };

    //

    const { children } = props;

    return (
      <>
        <TodoContext.Provider
          value={{
            scrollRef,
            containerRef,
            handleScroll,
            todoLists,
            setTodoLists,
            inCalendarTodoLists,
            setInCalendarTodoLists,
            formInput,
            setFormInput,
            emptyFormInput,
            createTodoListsAndinClendarTodoLists,
            updateTodoListsAndTaskLists,
            deleteTodoListsAndTaskLists,
            onClickAddOrUpdateTasks,
            IncalendarAddTodoLists,
            IncalendarDeleteTodoLists,
            IncalendarUpdateTodoLists,
          }}
        >
          {children}
        </TodoContext.Provider>
      </>
    );
  }
);
