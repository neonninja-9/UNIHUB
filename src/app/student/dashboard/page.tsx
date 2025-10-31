'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockStudent, mockStudentCourses, mockRecentGrades } from '@/lib/student-mock-data'
import { Attendance } from '@/lib/types'
import { Sidebar } from '@/components/student/dashboard/sidebar'
import {
  WelcomeCard,
  StatsCards,
  CourseList,
  QuickLinks,
  Deadlines,
  Schedule,
  AttendanceChart,
  NotificationBoard
} from '@/components/student/dashboard/components'
import DigiLockerWidget from '@/components/DigiLockerWidget'
import { DashboardHeader } from '@/components/student/dashboard/components/header'

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
  </div>
)

export default function StudentDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [grades, setGrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Instead of fetching from API, use mock data
    setStudent({
      id: 1,
      ...mockStudent,
      roll_number: 'S101',
      class_section: 'A',
      phone: '1234567890',
      address: '123 Main St',
      parent_name: 'John Thompson',
      parent_phone: '555-1234',
      email: 'alex.thompson@student.unihub.com',
    })
    setCourses(
      mockStudentCourses.map((c, i) => ({
        id: c.id,
        code: c.code,
        name: c.title,
        teacher: c.teacher,
        schedule: 'Mon,Wed 09:15-10:10',
        classroom: 'B201',
        credits: 3,
        description: '',
        faculty_id: 2,
        created_at: '',
        updated_at: ''
      }))
    )
    setGrades([
      {
        id: 1,
        student_id: 1,
        course_id: 1,
        assignment_id: 1,
        marks_obtained: 88,
        feedback: 'Well done',
        due_date: '2025-11-02',
        title: 'Lab Report 4',
        total_marks: 100,
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        student_id: 1,
        course_id: 2,
        assignment_id: 2,
        marks_obtained: 79,
        feedback: 'Good',
        due_date: '2025-11-06',
        title: 'Midterm Exam',
        total_marks: 100,
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        student_id: 1,
        course_id: 3,
        assignment_id: 3,
        marks_obtained: 93,
        feedback: 'Excellent',
        due_date: '2025-11-12',
        title: 'Gatsby Essay Outline',
        total_marks: 100,
        created_at: '',
        updated_at: ''
      }
    ])
    setAttendance([
      // Mock attendance for courses
      ...Array(12).fill(0).map((_, i) => ({
        id: i + 1,
        student_id: 1,
        course_id: 1,
        date: `2025-10-${(i + 1).toString().padStart(2, '0')}`,
        status: i % 4 === 0 ? 'absent' : 'present',
        created_at: '',
        updated_at: ''
      })),
      ...Array(10).fill(0).map((_, i) => ({
        id: 100 + i,
        student_id: 1,
        course_id: 2,
        date: `2025-10-${(i + 1).toString().padStart(2, '0')}`,
        status: i % 5 === 0 ? 'absent' : 'present',
        created_at: '',
        updated_at: ''
      })),
      ...Array(9).fill(0).map((_, i) => ({
        id: 200 + i,
        student_id: 1,
        course_id: 3,
        date: `2025-10-${(i + 1).toString().padStart(2, '0')}`,
        status: i % 6 === 0 ? 'absent' : 'present',
        created_at: '',
        updated_at: ''
      })),
    ])
    setLoading(false)
  }, [router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-2">Unable to load student data</h2>
          <button 
            onClick={() => router.push('/')} 
            className="text-indigo-400 hover:underline"
          >
            Return to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white flex-col flex dark:bg-[#f9fafb] dark:text-gray-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 w-full">
        <DashboardHeader student={student} onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
        {/* Responsive Main Content */}
        <div className="p-2 sm:p-4 md:p-6 max-w-full md:max-w-[1600px] mx-auto transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left & Center Content */}
            <div className="sm:col-span-2 space-y-4 md:space-y-6">
              <WelcomeCard student={student} />
              <StatsCards
                grades={grades}
                attendance={attendance}
                courses={courses}
              />
              <CourseList
                courses={courses}
                attendance={attendance}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <AttendanceChart
                courses={courses}
                attendance={attendance}
              />
              <QuickLinks className="cursor-pointer hover:scale-105 transition-transform duration-200" />
            </div>
            {/* Right Sidebar Widgets */}
            <div className="space-y-4 md:space-y-6">
              <Deadlines
                courses={courses}
                grades={grades}
              />
              <Schedule courses={courses} />
              <NotificationBoard />
              <DigiLockerWidget userType="student" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
