import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const generateToken = async () => {
  try {
    const response = await api.get("/generate-token");
    const { token } = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp * 1000;
    return expiration < Date.now();
  } catch (error) {
    return true;
  }
};
