import React from 'react';
import TaskCalendar from './TaskCalendar';
import LatestTasks from './LatestTasks';
import requireAuth from '../requireAuth';

const Dashboard = () => {

  return (
    <div>
     <LatestTasks/>
     <TaskCalendar/>
    </div>
  );
};

export default requireAuth(Dashboard);
