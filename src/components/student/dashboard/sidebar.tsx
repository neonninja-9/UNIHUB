"use client";
import React from "react";
import {
  LayoutDashboard,
  Book,
  Calendar,
  BarChart2,
  Settings,
  Menu,
  X,
  LogOut,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { darkMode, setDarkMode } = useTheme();
  return (
    <>
      {/* Overlay for all devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        />
      )}

      <div
<<<<<<< HEAD
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out dark:bg-[#1A1F3A] dark:border-gray-800 dark:shadow-[0_4px_12px_rgba(0,0,0,0.08)]`}
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-[#3b82f6]">UNIHUB</h1>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1 dark:text-[#6b7280]">Student Portal</p>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-l-4 border-transparent hover:border-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-[#0A0E27]">
              <a href="#" className="flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                Dashboard
              </a>
            </li>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-l-4 border-transparent hover:border-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-[#0A0E27]">
              <a href="#" className="flex items-center">
                <Book className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                Courses
              </a>
            </li>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-l-4 border-transparent hover:border-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-[#0A0E27]">
              <a href="#" className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                Schedule
              </a>
            </li>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-l-4 border-transparent hover:border-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-[#0A0E27]">
              <a href="#" className="flex items-center">
                <BarChart2 className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                Grades
              </a>
            </li>
            <li className="px-5 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-l-4 border-transparent hover:border-blue-500 transition-colors dark:text-gray-300 dark:hover:bg-[#0A0E27]">
              <a href="#" className="flex items-center">
                <Settings className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                Settings
              </a>
            </li>
          </ul>
=======
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1A1F3A] border-r border-gray-800 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out dark:bg-[#11172a] dark:border-gray-800 flex flex-col h-full`}
      >
        <div className="p-5 border-b border-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-400 dark:text-blue-400">
              UNIHUB
            </h1>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-lg dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-1 dark:text-gray-300">
            Student Portal
          </p>
        </div>
        <nav className="flex-1 flex flex-col justify-between h-0">
          <div className="overflow-auto flex-1">
            <ul>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Dashboard
                </a>
              </li>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <Book className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Courses
                </a>
              </li>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Schedule
                </a>
              </li>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <BarChart2 className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Grades
                </a>
              </li>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <FileText className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Documents
                </a>
              </li>
              <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-200 dark:hover:bg-[#232946]">
                <a href="#" className="flex items-center">
                  <Settings className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-100" />
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/");
              }}
              className="flex items-center gap-3 w-full px-5 py-3 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
>>>>>>> 66ad0c7e130c57ef79d3185326baf1c18479c3e4
        </nav>
      </div>
    </>
  );
};
