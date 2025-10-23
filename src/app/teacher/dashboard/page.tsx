"use client";

import React, { useState } from 'react';
import { BookOpen, Users, FileSignature } from 'lucide-react';
import { mockAssignments, mockCourses, mockTeacher, mockUpcomingEvents } from '@/lib/mock-data';
import { ThemeProvider } from '@/hooks/use-theme';
import { Sidebar } from '@/components/teacher/dashboard/sidebar';
import { Header } from '@/components/teacher/dashboard/header';
import { StatCard } from '@/components/teacher/dashboard/stat-card';
import { AssignmentsWidget } from '@/components/teacher/dashboard/assignments-widget';
import { AILessonPlanner } from '@/components/teacher/dashboard/ai-lesson-planner';
import { UpcomingEventsWidget } from '@/components/teacher/dashboard/upcoming-events-widget';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Welcome back, {mockTeacher.name.split(' ')[1]}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard icon={BookOpen} label="Active Courses" value={mockCourses.length} color="blue" />
              <StatCard icon={Users} label="Total Students" value={totalStudents} color="green" />
              <StatCard icon={FileSignature} label="Submissions to Grade" value={mockAssignments.filter(a => a.submitted > 0).length} color="yellow" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AssignmentsWidget assignments={mockAssignments} />
              
              <div className="col-span-1 space-y-8">
                <AILessonPlanner />
                <UpcomingEventsWidget events={mockUpcomingEvents} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
