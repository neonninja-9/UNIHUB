'use client'
import React from 'react';
import { LayoutDashboard, Book, Calendar, BarChart2, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">UNIHUB</h1>
        </div>
        <nav className="mt-5">
            <ul>
                <li className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <a href="#" className="flex items-center">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </a>
                </li>
                <li className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <a href="#" className="flex items-center">
                        <Book className="w-5 h-5 mr-3" />
                        Courses
                    </a>
                </li>
                <li className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <a href="#" className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3" />
                        Schedule
                    </a>
                </li>
                <li className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <a href="#" className="flex items-center">
                        <BarChart2 className="w-5 h-5 mr-3" />
                        Grades
                    </a>
                </li>
                <li className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    <a href="#" className="flex items-center">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  );
}
