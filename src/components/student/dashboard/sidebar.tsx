'use client'
import React from 'react'
import { LayoutDashboard, Book, Calendar, BarChart2, Settings, Menu, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
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
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1A1F3A] border-r border-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out dark:bg-[#1A1F3A] dark:border-gray-800 dark:shadow-[0_4px_12px_rgba(0,0,0,0.08)]`}
      >
        <div className="p-5 border-b border-gray-800 dark:border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-400 dark:text-[#3b82f6]">UNIHUB</h1>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-lg dark:hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-400 dark:text-gray-600" />
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-1 dark:text-[#6b7280]">Student Portal</p>
        </div>
        <nav className="mt-5">
          <ul>
            <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-700 dark:hover:bg-gray-100">
              <a href="#" className="flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-600" />
                Dashboard
              </a>
            </li>
            <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-700 dark:hover:bg-gray-100">
              <a href="#" className="flex items-center">
                <Book className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-600" />
                Courses
              </a>
            </li>
            <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-700 dark:hover:bg-gray-100">
              <a href="#" className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-600" />
                Schedule
              </a>
            </li>
            <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-700 dark:hover:bg-gray-100">
              <a href="#" className="flex items-center">
                <BarChart2 className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-600" />
                Grades
              </a>
            </li>
            <li className="px-5 py-3 text-gray-300 hover:bg-[#0A0E27] cursor-pointer border-l-4 border-transparent hover:border-blue-400 transition-colors dark:text-gray-700 dark:hover:bg-gray-100">
              <a href="#" className="flex items-center">
                <Settings className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-600" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
