import { Card, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Task, fetchTasks } from "../../features/slices/taskSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type TaskListProps = {
  onCardClick: (task: Task) => void; // Update 'TaskType' with the type of your task objects
};

const TaskList = ({ onCardClick }: TaskListProps) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.task.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Task List</h3>
      <div>
        <Row className="justify-content-center">
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
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default TaskList;

{
  /* <h3 style={{ textAlign: "center" }}>Task List</h3>
      {tasks.length > 0 ? (
        <div className="card-container">
          {tasks.map((task: Task) => (
            <Card
              key={task.id}
              className="m-2"
              style={{ width: "18rem", cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.textBody}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>{"Loading"}</p>
      )} 
      <Col key={task.id} sm={6} md={4} lg={3}>
       <Card
              style={{ cursor: "pointer" }}
              onClick={() => {
                // Handle click on task card
                console.log("Clicked on task:", task);
              }}
            >
            </Card>
            </Col>
      */
}
