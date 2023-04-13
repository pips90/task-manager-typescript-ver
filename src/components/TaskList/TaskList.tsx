import { Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Task, fetchTasks } from "../../features/slices/taskSlice";
import { useEffect } from "react";

/* FUTURE WORK 
Don't use so much inLine styling. Use stylesheet.
Don't use <br /> for spacing- that's a bad habit.
*/

type TaskListProps = {
  onCardClick: (task: Task) => void;
};

const TaskList = ({ onCardClick }: TaskListProps) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Card style={{ width: "150rem", margin: "auto" }}>
      <Card className="justify-content-center">
        <br />
        <h3 style={{ textAlign: "center" }}>Task List</h3>
        <br />
        <div>
          <Row
            className="justify-content-center"
            style={{ marginBottom: "3rem" }}
          >
            {tasks.map((task) => (
              <Col key={task.id} sm={6} md={4} lg={3}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => onCardClick(task)}
                >
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.textBody}</Card.Text>
                  </Card.Body>
                </Card>{" "}
                <br />
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </Card>
  );
};

export default TaskList;
