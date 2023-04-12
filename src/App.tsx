import "./App.css";
import { useAppDispatch } from "./app/hooks";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { Task, createTask } from "./features/slices/taskSlice";

function App() {
  const dispatch = useAppDispatch();
  const handleAddTask = (task: Task) => {
    dispatch(createTask(task));
  };

  return (
    <>
      <TaskForm onSubmit={handleAddTask} />
    </>
  );
}

export default App;
