import React from "react";
import { formatDate } from "../../utils/helpers";
import {
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  ArrowRightLeft,
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
        <div className="flex-1">
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {task.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
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
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            ID: {task._id}
          </p>
          {isMobile && (
            <div className="relative group/tooltip">
              <button
                onClick={handleStatusChange}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm backdrop-blur-sm
                  ${
                    task.completed
                      ? "bg-orange-500/90 text-white hover:bg-orange-600 active:bg-orange-700"
                      : "bg-green-500/90 text-white hover:bg-green-600 active:bg-green-700"
                  }
                  animate-fadeIn`}
                aria-label={getStatusTooltip()}
              >
                {task.completed ? (
                  <Circle className="w-3 h-3" />
                ) : (
                  <CheckCircle className="w-3 h-3" />
                )}
                <span className="hidden sm:inline">
                  {task.completed ? "Desmarcar" : "Completar"}
                </span>
              </button>
              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none">
                {getStatusTooltip()}
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
