import React, { createContext, useState } from "react";
import dayjs from "dayjs";

export const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Sample Task 1",
    description: "This is a task",
    status: "To Do",
    created: dayjs(),
    assignee: "John",
  },
  {
    id: 2,
    title: "Sample Task 2",
    description: "Another task",
    status: "In Progress",
    created: dayjs(),
    assignee: "Jane",
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks((prev) => [...prev, { id: Date.now(), ...task }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
