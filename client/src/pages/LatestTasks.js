import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Container } from "react-bootstrap";
import moment from "moment";
import "./LatestTasks.css";
import requireAuth from "../requireAuth";

const LatestTasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [noTasksMessage, setNoTasksMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    fetch(`https://black-earthworm-toga.cyclic.app/task/api/tasks?userId=${userId}`)
      .then((response) => response.json())
      .then((tasks) => {
        const currentWeekTasks = tasks.filter((task) =>
          moment(task.dueDate).isSameOrAfter(moment(), "week")
        );
        setTaskList(currentWeekTasks);
        if (currentWeekTasks.length === 0) {
          setNoTasksMessage("No tasks due this week");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": {
        return "danger";
      }
      case "medium": {
        return "warning";
      }
      case "low": {
        return "success";
      }
      default: {
        console.log("default case");
        return "secondary";
      }
    }
  };

  const cardClassName = `mt-4${taskList.length === 0 ? " no-tasks" : ""}`;
  const containerStyle = { height: taskList.length > 0 ? "250px" : "100px" ,width: taskList.length > 0 ? "800px" : "154px",display:"flex",justifyContent:"center" }; // Conditionally set the height of the Container based on the length of the taskList

  return (
    <Card className={cardClassName} style={{ margin: "0 auto" }}>
      <Card.Header as="h5" style={{ fontSize: "1.2rem" }}>Tasks for the Week</Card.Header>
      <Card.Body style={{ padding: "0" }}>
        <Container fluid style={containerStyle}>
          {noTasksMessage ? (
            <p className="text-center" style={{ fontSize: "1.1rem" }}>{noTasksMessage}</p>
          ) : (
            <Row className="card-row">
              {taskList.map((task) => (
                <Col key={task._id} className="card-wrapper">
                  <Card style={{ width: "15rem", height: "10rem" }}>
                    <Card.Body className="card-body">
                      <Card.Title style={{ fontSize: "1rem" }}>{task.task}</Card.Title>
                      <Card.Text className="task-description" style={{ fontSize: "0.8rem" }}>
                        {task.description}
                      </Card.Text>
                      <Badge
                        bg={getPriorityColor(task.priority)}
                        className="badge"
                        style={{ fontSize: "0.8rem", padding: "4px" }}
                      >
                        {task.priority}
                      </Badge>
                      <Card.Text className="due-date" style={{ fontSize: "0.8rem" }}>
                        Due: {moment(task.dueDate).format("MMM DD")}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default requireAuth(LatestTasks);
