import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import { Task } from "./features/slices/taskSlice";

const handleAddTask = () => {
  // dispatch here
};

function App() {
  return (
    <>
      <TaskForm onSubmit={handleAddTask} />
    </>
  );
}

export default App;
