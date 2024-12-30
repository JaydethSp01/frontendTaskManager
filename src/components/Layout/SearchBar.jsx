import React, { useState } from "react";
import { Filter, X } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
    setIsOpen(false);
  };

  const options = [
    {
      value: "all",
      label: "Todas las tareas",
      description: "Ver todas las tareas",
    },
    {
      value: "completed",
      label: "Completadas",
      description: "Ver tareas finalizadas",
    },
    {
      value: "pending",
      label: "Pendientes",
      description: "Ver tareas en proceso",
    },
  ];

  return (
    <div className="flex justify-center w-full max-w-xl mx-auto my-6 px-4">
      <div className="relative w-full">
        {/* Selected Option Display */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white dark:bg-gray-800 flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-200">
              {options.find((opt) => opt.value === searchTerm)?.label}
            </span>
          </div>
          <div className="flex items-center">
            {searchTerm !== "all" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch("all");
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <div
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 animate-fadeIn">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSearch(option.value)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  searchTerm === option.value
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {option.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
