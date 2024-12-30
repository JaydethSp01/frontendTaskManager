import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const updateTaskStatus = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
