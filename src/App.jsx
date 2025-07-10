import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KanbanBoard from './Components/KanbanBoard';
import Login from './Pages/Login';
import { TaskProvider } from './context/TaskContext';
import Protected from './Pages/Protected';
import './App.css';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Protected />}>
            <Route path="/" element={<KanbanBoard />} />
          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
