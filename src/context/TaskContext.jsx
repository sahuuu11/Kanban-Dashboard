import React, { createContext, useState } from "react";
import { board } from "../Constant/BoardItem";
import { notificationMessage } from "../Helpers/notificationHelper";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(board);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...task }]);
    notificationMessage('success', 'Task Added Successfully');
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((record) => (record.id === updatedTask.id ? updatedTask : record))
    );
     notificationMessage('success', 'Task Updated Successfully');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((record) => record.id !== id));
    notificationMessage('success', 'Task Deleted Successfully');
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
