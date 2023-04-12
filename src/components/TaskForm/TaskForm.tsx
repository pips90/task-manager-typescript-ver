import { Button, Card, Form } from "react-bootstrap";
import { Task } from "../../features/slices/taskSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList/TaskList";

// import { type } from "./../../app/store";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isCardSelected, setIsCardSelected] = useState<boolean>(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTask(title, body);
  };

  const handleCardClick = (task: Task) => {
    setTitle(task.title);
    setBody(task.textBody);
    setIsCardSelected(true);
  };

  const handleAddTask = (title: string, body: string) => {
    const task: Task = {
      id: uuidv4(),
      title: title,
      textBody: body,
    };

    onSubmit(task);
  };

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
          </Form.Group>
        </Form>
      </Card>
      <TaskList onCardClick={handleCardClick} />
    </>
  );
};

export default TaskForm;
