import React, { useState, useEffect } from "react";
import useTask from "../hooks/useTask";
import TaskItem from "../components/Task/TaskItem";
import TaskForm from "../components/Task/TaskForm";
import SearchBar from "../components/Layout/SearchBar";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Plus, AlertCircle, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySwal = withReactContent(Swal);

const Home = () => {
  const {
    tasks,
    addTask,
    editTask,
    removeTask,
    updateTaskStatus,
    fetchTasksByStatus,
  } = useTask();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    updateGlobalStats(tasks);
    setFilteredTasks(tasks);
  }, [tasks]);

  const updateGlobalStats = (allTasks) => {
    setGlobalStats({
      total: allTasks.length,
      completed: allTasks.filter((task) => task.completed).length,
      pending: allTasks.filter((task) => !task.completed).length,
    });
  };

  const handleStatClick = async (status) => {
    setLoading(true);
    try {
      if (status === "total") {
        setFilteredTasks(tasks);
        setActiveStatus("all");
      } else {
        const filtered = tasks.filter((task) =>
          status === "completed" ? task.completed : !task.completed
        );
        setFilteredTasks(filtered);
        setActiveStatus(status);
      }
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Error al filtrar las tareas
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, type }) => (
    <div
      onClick={() => handleStatClick(type)}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer 
        ${
          activeStatus === type
            ? "ring-2 ring-blue-500 shadow-xl"
            : "hover:shadow-xl"
        }
        ${
          type === "total" && activeStatus === "all"
            ? "ring-2 ring-blue-500 shadow-xl"
            : ""
        }
      `}
    >
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        {title}
      </h3>
      <p
        className={`text-3xl font-bold ${
          type === "completed"
            ? "text-green-600"
            : type === "pending"
            ? "text-orange-600"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );

  const handleDrop = async (taskId, newStatus) => {
    if (isMobile) return;

    setIsDragging(false);
    const completed = newStatus === "completed";
    setLoading(true);
    try {
      await updateTaskStatus(taskId, { status: newStatus, completed });
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Tarea movida a {newStatus}
        </div>
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Error al mover la tarea
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setLoading(true);
    try {
      await updateTaskStatus(taskId, {
        status: newStatus,
        completed: newStatus === "completed",
      });
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Tarea movida a {newStatus}
        </div>
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Error al mover la tarea
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setFormVisible(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setFormVisible(true);
  };

  const handleSaveTask = async (task) => {
    setLoading(true);
    try {
      if (selectedTask) {
        await editTask(selectedTask._id, task);
      } else {
        await addTask(task);
      }
      setFormVisible(false);
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Tarea guardada con éxito
        </div>
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Error al guardar la tarea
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  const handleSearch = async (status) => {
    setLoading(true);
    try {
      await fetchTasksByStatus(status === "all" ? "" : status);
      setActiveStatus(status);
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Error al buscar las tareas
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "rgb(243 244 246)",
      borderRadius: "1rem",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await removeTask(taskId);
          toast.success(
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Tarea eliminada con éxito
            </div>
          );
        } catch (error) {
          toast.error(
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Error al eliminar la tarea
            </div>
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const renderColumns = () => {
    const columns = ["pending", "completed"];
    return activeStatus === "all" ? columns : [activeStatus];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <Navbar onNewTask={handleNewTask} />

      <div className="container mx-auto flex flex-col gap-6 p-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-15">
          <StatCard
            title="Total Tareas"
            value={globalStats.total}
            type="total"
          />
          <StatCard
            title="Completadas"
            value={globalStats.completed}
            type="completed"
          />
          <StatCard
            title="Pendientes"
            value={globalStats.pending}
            type="pending"
          />
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="flex flex-col lg:flex-row gap-6">
          {renderColumns().map((status) => (
            <div
              key={status}
              className={`w-full ${
                activeStatus === "all" ? "lg:w-1/2" : ""
              } backdrop-blur-lg rounded-xl overflow-hidden ${
                !isMobile && isDragging
                  ? "ring-2 ring-blue-500 ring-opacity-50"
                  : ""
              } transform transition-all duration-300`}
              onDrop={(e) => {
                if (!isMobile) {
                  e.preventDefault();
                  handleDrop(e.dataTransfer.getData("taskId"), status);
                }
              }}
              onDragOver={(e) => !isMobile && e.preventDefault()}
              onDragEnter={() => !isMobile && setIsDragging(true)}
              onDragLeave={() => !isMobile && setIsDragging(false)}
            >
              <div
                className={`p-4 ${
                  status === "pending"
                    ? "bg-gradient-to-r from-orange-400 to-pink-500"
                    : "bg-gradient-to-r from-green-400 to-emerald-500"
                }`}
              >
                <h2 className="text-2xl font-bold text-white text-center capitalize mb-4">
                  {status === "pending"
                    ? "Tareas Pendientes"
                    : "Tareas Completadas"}
                </h2>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 min-h-[300px] shadow-inner">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTasks
                      .filter((task) =>
                        status === "completed"
                          ? task.completed
                          : !task.completed
                      )
                      .map((task) => (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleStatusChange}
                          isMobile={isMobile}
                        />
                      ))}
                    {filteredTasks.filter((task) =>
                      status === "completed" ? task.completed : !task.completed
                    ).length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                        <div className="mb-4">
                          {status === "completed" ? "🎉" : "📝"}
                        </div>
                        <p className="text-center">
                          {status === "completed"
                            ? "No hay tareas completadas"
                            : "No hay tareas pendientes"}
                        </p>
                        {status === "pending" && (
                          <button
                            onClick={handleNewTask}
                            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Agregar tarea
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <TaskForm
            task={selectedTask}
            onCancel={handleCancel}
            onSave={handleSaveTask}
            isOpen={true}
          />
        )}
      </div>

      {!isFormVisible && <Footer />}
    </div>
  );
};

export default Home;
