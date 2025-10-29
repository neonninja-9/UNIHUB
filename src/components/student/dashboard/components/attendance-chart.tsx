import React from 'react'
import { Course, Attendance } from '@/lib/types'

interface AttendanceChartProps {
  courses: Course[]
  attendance: Attendance[]
}

export function AttendanceChart({ courses, attendance }: AttendanceChartProps) {
  return (
    <div className="bg-[#1A1F3A] rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">My Attendance</h3>
      <div className="flex items-center gap-8">
        <div className="relative">
          {/* Calculate overall attendance */}
          {(() => {
            const totalClasses = attendance.length
            const presentClasses = attendance.filter(a => a.status === 'present').length
            const overallPercentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0
            const radius = 56
            const circumference = 2 * Math.PI * radius
            const offset = circumference * (1 - overallPercentage / 100)
            
            return (
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r={radius} stroke="#2A2F4A" strokeWidth="12" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#EF4444"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
                <text
                  x="64"
                  y="64"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="text-3xl font-bold fill-white transform rotate-90"
                >
                  {Math.round(overallPercentage)}%
                </text>
                <text
                  x="64"
                  y="80"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="text-xs fill-gray-400 transform rotate-90"
                >
                  Overall
                </text>
              </svg>
            )
          })()}
        </div>

        <div className="flex-1 space-y-4">
          {courses.map((course, index) => {
            const courseAttendance = attendance.filter(a => a.course_id === course.id)
            const totalClasses = courseAttendance.length
            const presentClasses = courseAttendance.filter(a => a.status === 'present').length
            const percentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0

            // Get appropriate color classes based on percentage
            const getColorClasses = (percentage: number) => {
              if (percentage < 50) return { text: 'text-red-400', bg: 'bg-red-500' }
              if (percentage < 75) return { text: 'text-orange-400', bg: 'bg-orange-500' }
              if (percentage < 85) return { text: 'text-yellow-400', bg: 'bg-yellow-500' }
              return { text: 'text-green-400', bg: 'bg-green-500' }
            }

            const colorClasses = getColorClasses(percentage)

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{course.name.toUpperCase()}</span>
                  <span className={colorClasses.text}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${colorClasses.bg} rounded-full h-2`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}