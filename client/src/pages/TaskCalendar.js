import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import requireAuth from "../requireAuth";

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    fetch(`https://black-earthworm-toga.cyclic.app/task/api/tasks?userId=${userId}`)
      .then((response) => response.json())  
      .then((data) => {
        console.log("ress...",data)
        const taskEvents = data.map((task) => ({
          title: task.task,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
        }));
        setEvents(taskEvents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calendarStyle = {
    height: "400px",
    maxWidth: "800px",
    margin: "0 auto",
  };

  return (
    <div className="mt-4" style={calendarStyle}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default requireAuth(TaskCalendar);
