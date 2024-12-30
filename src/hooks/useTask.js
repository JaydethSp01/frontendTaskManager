import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../Api/tasksApi";

const useTask = () => {
  const {
    tasks,
    setTasks,
    updateTaskStatus: contextUpdateTaskStatus,
  } = useContext(TaskContext);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    loadTasks();
  }, [setTasks]);

  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const editTask = async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const fetchTasksByStatus = async (status) => {
    try {
      const data = await fetchTasks(status);
      setTasks(data);
    } catch (error) {
      console.error("Error al buscar las tareas:", error);
    }
  };

  const updateTaskStatus = async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);
      contextUpdateTaskStatus(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  return {
    tasks,
    addTask,
    editTask,
    removeTask,
    updateTaskStatus,
    fetchTasksByStatus,
  };
};

export default useTask;
