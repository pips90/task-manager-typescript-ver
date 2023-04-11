import { Button, Card, Form } from "react-bootstrap";
import { Task } from "../../features/slices/taskSlice";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const handleAddTask = () => {
  // handle you're onSubmit here- passing in the data
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
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
        <Form onSubmit={handleAddTask}>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button type="submit">Add Task</Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default TaskForm;
