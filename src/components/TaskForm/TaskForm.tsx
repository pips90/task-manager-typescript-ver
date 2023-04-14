import { Button, Card, Form } from "react-bootstrap";
import {
  Task,
  cancelClick,
  createTask,
  deleteTask,
  editTask,
  fetchTasks,
} from "../../features/slices/taskSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList/TaskList";

import { useAppDispatch } from "../../app/hooks";

/* Future Work

interface inputFields {
  title: string;
  body: string;
}

  const [task, setTask] = useState<inputFields>({title: "", body: ""}) This should be implented so I don't have to keep setting them separately

*/

const TaskForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isCardSelected, setIsCardSelected] = useState<boolean>(false);
  const [clickedCardId, setclickedCardId] = useState<string>("");

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
    // Click on task card
    setclickedCardId(task.id);
    setTitle(task.title);
    setBody(task.textBody);
    setIsCardSelected(true);
  };

  const handleDeleteTask = async () => {
    // Delete task card
    await dispatch(deleteTask(clickedCardId)).then(() => {
      dispatch(fetchTasks());
    });
    setIsCardSelected(false);
    setTitle("");
    setBody("");
  };

  const handleCancelClick = () => {
    // cancelling edit/delete will clear fields and soft refresh
    dispatch(cancelClick());
    setIsCardSelected(false);
    setTitle("");
    setBody("");
  };

  const handleAddTask = async (title: string, body: string) => {
    // when task is submitted whether adding, or editing a task card
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
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              value={body}
              placeholder="Put your tasks here"
              onChange={onBodyChange}
              required
            />
          </Form.Group>
          <Form.Group
            className="d-flex justify-content-end"
            style={{ marginBottom: ".5rem", marginTop: ".5rem" }}
          >
            <Button style={{ marginRight: ".5rem" }} type="submit">
              {isCardSelected ? "Edit" : "Add Task"}
            </Button>{" "}
            {isCardSelected && (
              <>
                <Button
                  variant="danger"
                  style={{ marginRight: ".5rem" }}
                  type="button"
                  onClick={() => handleDeleteTask()}
                >
                  Delete
                </Button>{" "}
                <Button
                  variant=" rounded-circle "
                  style={{
                    marginRight: ".5rem",
                    backgroundColor: "#D3D3D3",
                  }}
                  type="button"
                  onClick={() => handleCancelClick()}
                >
                  x
                </Button>
              </>
            )}
          </Form.Group>
        </Form>
      </Card>{" "}
      <br />
      <TaskList onCardClick={handleCardClick} />
    </>
  );
};

export default TaskForm;
