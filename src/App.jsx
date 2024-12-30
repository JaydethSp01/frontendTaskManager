import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { generateToken, isTokenExpired } from "./api/authApi";
import { ToastContainer } from "react-toastify";
import "./styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const initToken = async () => {
      if (!isTokenExpired()) {
        console.log("Token válido o renovado");
      } else {
        console.log("Token expirado o no existe, generando uno nuevo...");
        await generateToken();
      }
    };

    initToken();
  }, []);

  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </Router>
    </TaskProvider>
  );
}

export default App;
