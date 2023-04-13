import { Button, Card, Form } from "react-bootstrap";
import {
  Task,
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
} from "../../features/slices/taskSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList/TaskList";

import { useAppDispatch } from "../../app/hooks";

const TaskForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isCardSelected, setIsCardSelected] = useState<boolean>(false);
  const [clickedCardId, setclickedCardId] = useState<string>("");
  const [isTaskDeleted, setIsTaskDeleted] = useState<boolean>(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTask(title, body);
    setTitle("");
    setBody("");
  };

  const handleCardClick = (task: Task) => {
    console.log(task.id);
    setclickedCardId(task.id);
    setTitle(task.title);
    setBody(task.textBody);
    setIsCardSelected(true);
  };

  const handleDeleteTask = async () => {
    // Delete task
    console.log("Task is deleted");
    await dispatch(deleteTask(clickedCardId)).then(() => {
      dispatch(fetchTasks()); // Dispatch fetchTasks() after successfully dispatching deleteTask()
    });
  };

  const handleAddTask = async (title: string, body: string) => {
    if (isCardSelected === true) {
      // Edit task
      const task = {
        id: clickedCardId,
        title: title,
        textBody: body,
      };
      await dispatch(editTask(task));
      dispatch(fetchTasks());
    } else {
      // Create task
      const task = {
        id: uuidv4(),
        title: title,
        textBody: body,
      };
      dispatch(createTask(task));
    }
  };

  // const handleDeleteTask = (id: string) => {
  //   dispatch(deleteTask(clickedCardId)).then(() => {
  //     dispatch(fetchTasks());
  //   });
  // };

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Task Manager
      </h3>
      <Card className="w-25 mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={onTitleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={body}
              placeholder="Put your tasks here"
              onChange={onBodyChange}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button type="submit">
              {isCardSelected ? "Edit" : "Add Task"}
            </Button>
            {isCardSelected && (
              <Button type="button" onClick={() => handleDeleteTask()}>
                Delete
              </Button>
            )}
          </Form.Group>
        </Form>
      </Card>
      <TaskList onCardClick={handleCardClick} />
    </>
  );
};

export default TaskForm;
