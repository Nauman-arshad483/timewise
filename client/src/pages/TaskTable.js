import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Dropdown, Badge } from "react-bootstrap";
import requireAuth from "../requireAuth";

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [sortType, setSortType] = useState("due_date");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pink-nice-walrus.cyclic.app/task/api/tasks?userId=${userId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json().then(response => {
            console.log(response.message);
            return response.data;
        });
        console.log("data is",data)
        const formattedData = data.map((task) => {
          const date = new Date(task.dueDate);
          const formattedDate = date.toISOString().slice(0, 10);
          return { ...task, dueDate: formattedDate };
        });
        setTaskList(formattedData);
        setSortedList(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
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
  const handleComplete = (taskId) => {
    fetch(`https://pink-nice-walrus.cyclic.app/task/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        // Update taskList and sortedList with the updated task
        const updatedTaskList = taskList.map((task) =>
          task._id === updatedTask._id ? { ...task, completed: true } : task
        );
        setTaskList(updatedTaskList);
  
        const updatedSortedList = sortedList.map((task) =>
          task._id === updatedTask._id ? { ...task, completed: true } : task
        );
        setSortedList(updatedSortedList);
      })
      .catch((error) => console.error(error));
  };
  

  const sortTasks = (type) => {
    setSortType(type);
    let sortedTasks = [];
    if (type === "due_date") {
      sortedTasks = taskList.sort((a, b) => {
        if (a.dueDate < b.dueDate) return -1;
        if (a.dueDate > b.dueDate) return 1;
        return 0;
      });
    } else if (type === "priority") {
      sortedTasks = taskList.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      });
    }
    setSortedList(sortedTasks);
  };

  return (
    <Card className="mt-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Card.Header as="h5">Tasks for the Week</Card.Header>
      <div className="d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Sort by: {sortType === "due_date" ? "Due Date" : "Priority"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sortTasks("due_date")}>
              Due Date
            </Dropdown.Item>
            <Dropdown.Item onClick={() => sortTasks("priority")}>
              Priority
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <ListGroup variant="flush">
          {sortedList.map((task, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <Badge
                    bg={getPriorityColor(task.priority)}
                    style={{ width: "60px" }}
                  >
                    {task.priority}
                  </Badge>
                  <p>Due date: {task.dueDate}</p>
                </div>
                <Button
                  variant="success"
                  disabled={task.completed}
                  className="complete-button"
                  onClick={() => handleComplete(task._id)}
                >
                  {task.completed ? "Completed" : "Complete"}
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <style>{`
   .complete-button {
    background-color:  #0e88a0;
    border-color:  #0e88a0;
  }
  .bg-primary {
    background-color: #0e88a0 !important;
  }
      `}</style>
    </Card>
  );
};

export default requireAuth(TaskList);
