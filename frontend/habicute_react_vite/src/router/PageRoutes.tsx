import Calendar from "@/components/pages/Calendar";
import Home from "@/components/pages/Home";
import Todo from "@/components/pages/Todo";


const PageRoutes = [
  {
    path: "home",
    children: <Home />,
  },
  {
    path: "calendar",
    children: <Calendar />,
  },
  {
    path: "todo",
    children: <Todo />,
  },
];
export default PageRoutes;
