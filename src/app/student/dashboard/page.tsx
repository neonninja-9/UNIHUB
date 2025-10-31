'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Student, Course, Grade, Attendance } from '@/lib/types'
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
import { DashboardHeader } from '@/components/student/dashboard/components/header'
import { useToast } from '@/hooks/use-toast'

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
  </div>
)

export default function StudentDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [student, setStudent] = useState<Student | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) {
        console.log('No user data found in localStorage')
        router.push('/')
        return null
      }

      try {
        return JSON.parse(storedUser)
      } catch (e) {
        console.error('Invalid user data in localStorage')
        localStorage.removeItem('user')
        router.push('/')
        return null
      }
    }

    const fetchData = async () => {
      try {
        const user = await checkAuth()
        if (!user) return

        console.log('Stored user:', user)

        // Fetch student details
        const studentRes = await api.getStudent(user.id)
        // API may return either a wrapped { success, data } object or the raw student object.
        const studentData = (studentRes && (studentRes as any).data) ? (studentRes as any).data : studentRes
        if (!studentData) {
          throw new Error('No student data returned')
        }
        setStudent(studentData as Student)

        // Fetch courses and grades in parallel
        const [courseRes, gradesRes] = await Promise.all([
          api.getCourses(),
          api.getStudentResults(user.id)
        ])

  const coursesData = ((courseRes && (courseRes as any).data) ? (courseRes as any).data : courseRes) as Course[] || []
  setCourses(coursesData as Course[])
  const gradesData = (gradesRes && (gradesRes as any).data) ? (gradesRes as any).data : gradesRes || []
  setGrades(gradesData as Grade[])

        // Fetch attendance for each course
        const attendancePromises = coursesData.map(course =>
          api.getStudentAttendance(user.id, course.id)
        )

  const attendanceResults = await Promise.all(attendancePromises)
  // each attendance result may be raw array or wrapped
  const allAttendance = attendanceResults.flatMap((res: any) => (res && res.data) ? res.data : res || [])
  setAttendance(allAttendance as Attendance[])
      } catch (error) {
        console.error('Error fetching student data:', error)
        localStorage.removeItem('user')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      // Re-fetch data
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const [courseRes, gradesRes] = await Promise.all([
        api.getCourses(),
        api.getStudentResults(user.id)
      ])

      const coursesData = ((courseRes && (courseRes as any).data) ? (courseRes as any).data : courseRes) as Course[] || []
      setCourses(coursesData)
      const gradesData = (gradesRes && (gradesRes as any).data) ? (gradesRes as any).data : gradesRes || []
      setGrades(gradesData)

      const attendancePromises = coursesData.map(course =>
        api.getStudentAttendance(user.id, course.id)
      )
      const attendanceResults = await Promise.all(attendancePromises)
      const allAttendance = attendanceResults.flatMap((res: any) => (res && res.data) ? res.data : res || [])
      setAttendance(allAttendance as Attendance[])

      toast({
        title: "Dashboard refreshed",
        description: "Your data has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh data. Please try again.",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const handleQuickLinkClick = (link: string) => {
    toast({
      title: `${link} clicked`,
      description: `Navigating to ${link}...`,
    })
    // Here you would implement actual navigation
  }

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    toast({
      title: course.name,
      description: `Viewing details for ${course.name}`,
    })
  }

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    <div className="min-h-screen bg-[#0A0E27] text-white flex dark:bg-[#f9fafb] dark:text-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <DashboardHeader
          student={student}
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />

        {/* Main Content */}
        <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Left & Center Content */}
            <div className="xl:col-span-2 space-y-4 md:space-y-6">
              <WelcomeCard student={student} />
              <StatsCards
                grades={grades}
                attendance={attendance}
                courses={courses}
                onStatClick={(stat) => toast({ title: stat, description: `Viewing ${stat} details` })}
              />
              <AttendanceChart
                courses={filteredCourses}
                attendance={attendance}
              />

              <CourseList
                courses={filteredCourses}
                attendance={attendance}
                onCourseClick={handleCourseClick}
              />

              <QuickLinks onLinkClick={handleQuickLinkClick} />
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-1 space-y-4 md:space-y-6">
              <Deadlines
                courses={filteredCourses}
                grades={grades}
              />
              <Schedule courses={filteredCourses} />
              <NotificationBoard onNotificationClick={(notification) => toast({ title: notification.title, description: notification.message })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
