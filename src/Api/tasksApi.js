import axios from "axios";
import { getToken, isTokenExpired, generateToken } from "./authApi";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  let token = getToken();

  if (isTokenExpired()) {
    console.log("Token expirado, generando uno nuevo...");
    token = await generateToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchTasks = async (status) => {
  const query = status ? `?completed=${status}` : "";
  const { data } = await api.get(`/tasks${query}`);
  return data;
};

export const createTask = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

export const updateTask = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};
