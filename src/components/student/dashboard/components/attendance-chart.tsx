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
          {courses.map(course => {
            const courseAttendance = attendance.filter(a => a.course_id === course.id)
            const totalClasses = courseAttendance.length
            const presentClasses = courseAttendance.filter(a => a.status === 'present').length
            const percentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0
            
            // Determine color based on percentage
            let colorClass = 'green'
            if (percentage < 50) colorClass = 'red'
            else if (percentage < 75) colorClass = 'orange'
            else if (percentage < 85) colorClass = 'yellow'
            
            return (
              <div key={course.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{course.name.toUpperCase()}</span>
                  <span className={`text-${colorClass}-400`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-${colorClass}-500 rounded-full h-2`}
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