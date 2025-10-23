'use client'
import { ThemeProvider, useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { mockStudent, mockStudentCourses } from '@/lib/student-mock-data';
import { CourseCard } from '@/components/student/dashboard/course-card';
import { RecentGrades } from '@/components/student/dashboard/recent-grades';
import { UpcomingEvents } from '@/components/student/dashboard/upcoming-events';

const StudentDashboard = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};

const DashboardContent = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Welcome back, {mockStudent.name}!</p>
                </div>
                <button 
                    onClick={() => setDarkMode(!darkMode)} 
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mt-4 sm:mt-0"
                >
                    {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockStudentCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentGrades />
                <UpcomingEvents />
            </div>
        </div>
    </div>
  );
}

export default StudentDashboard;
