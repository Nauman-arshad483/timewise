import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import TaskTable from './pages/TaskTable';
import Home from './pages/Home';
import UploadTasks from './pages/UploadTasks';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfileCreationPage />} />
        <Route path="/uploadTasks" element={<UploadTasks />} />
        <Route path="/TaskTable" element={<TaskTable />} />
      </Routes>
    </Router>
  );
}

export default App;
