'use client'
import React from 'react'
import { LayoutDashboard, Book, Calendar, BarChart2, Settings, Menu, X, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
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
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1A1F3A] border-r border-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out dark:bg-[#11172a] dark:border-gray-800 flex flex-col h-full`}
      >
        <div className="p-5 border-b border-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-400 dark:text-blue-400">UNIHUB</h1>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded-lg dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-1 dark:text-gray-300">Student Portal</p>
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
                router.push('/');
              }}
              className="flex items-center gap-3 w-full px-5 py-3 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
