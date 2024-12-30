import React from "react";
import { formatDate } from "../../utils/helpers";
import {
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 border border-gray-100 dark:border-gray-700 mb-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-orange-500" />
            )}
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {task.title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {task.description}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            title="Editar tarea"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            title="Eliminar tarea"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1" title="Estado">
          {task.completed ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4 text-orange-500" />
          )}
          <span>{task.completed ? "Completada" : "Pendiente"}</span>
        </div>

        <div className="flex items-center gap-1" title="Fecha de creación">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.createdAt)}</span>
        </div>

        <div className="flex items-center gap-1" title="Última edición">
          <Clock className="w-4 h-4" />
          <span>{formatDate(task.updatedAt)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          ID: {task._id}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
