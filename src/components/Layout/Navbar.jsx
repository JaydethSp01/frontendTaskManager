import React from "react";
import { Link } from "react-router-dom";
import { ListTodo, Plus } from "lucide-react";

const Navbar = ({ onNewTask }) => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
          >
            <ListTodo className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">
              Task Manager
            </span>
          </Link>

          <button
            onClick={onNewTask}
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5 md:w-5 md:h-5" />
            <span className="hidden md:inline">Nueva Tarea</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
