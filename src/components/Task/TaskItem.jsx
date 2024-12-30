import React from "react";
import { formatDate, formatTimeAgo } from "../../utils/helpers";
import {
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete, onStatusChange, isMobile }) => {
  const handleDragStart = (e) => {
    if (!isMobile) {
      e.dataTransfer.setData("taskId", task._id);
    }
  };

  const handleStatusChange = () => {
    const newStatus = task.completed ? "pending" : "completed";
    onStatusChange(task._id, newStatus);
  };

  const getStatusTooltip = () => {
    return task.completed
      ? "¿Te equivocaste y aún no la terminas? Clic para marcar como pendiente de nuevo"
      : "¿Tarea finalizada? ¡Márcala como completada!";
  };

  return (
    <div
      draggable={!isMobile}
      onDragStart={handleDragStart}
      className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 border border-gray-100 dark:border-gray-700 mb-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white break-words">
              {task.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 break-words whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end flex-shrink-0">
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
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          {task.completed ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Circle className="w-4 h-4 text-orange-500" />
          )}
          <span>{task.completed ? "Completada" : "Pendiente"}</span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>
            {isMobile
              ? formatTimeAgo(task.createdAt)
              : `Creada el ${formatTimeAgo(task.createdAt)}`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>
            {isMobile
              ? formatTimeAgo(task.updatedAt)
              : `Última edición: ${formatTimeAgo(task.updatedAt)}`}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-end items-center">
          <button
            onClick={handleStatusChange}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-102 active:scale-95 shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden ${
              task.completed
                ? "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 active:from-orange-600 active:to-orange-700"
                : "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 active:from-green-600 active:to-green-700"
            } text-white`}
            aria-label={getStatusTooltip()}
          >
            {task.completed
              ? "Marcar como pendiente"
              : "Marcar como completada"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
