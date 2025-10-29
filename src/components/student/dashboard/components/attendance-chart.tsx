import React from 'react'
import { Course, Attendance } from '@/lib/types'

interface AttendanceChartProps {
  courses: Course[]
  attendance: Attendance[]
}

export function AttendanceChart({ courses, attendance }: AttendanceChartProps) {
  return (
    <div className="bg-[#1A1F3A] dark:bg-gradient-to-b dark:from-white dark:to-[#f9fafb] rounded-3xl p-6 md:p-8 shadow-lg dark:shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:scale-[1.01] dark:hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_20px_rgba(0,0,0,0.12)]">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white dark:text-[#111827]">My Attendance</h3>

        {/* Overall attendance circle */}
        <div className="relative">
          {(() => {
            const totalClasses = attendance.length
            const presentClasses = attendance.filter(a => a.status === 'present').length
            const overallPercentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0

            return (
              <div
                className="w-20 h-20 rounded-full bg-gradient-conic from-[#10b981] to-[#e5e7eb] dark:from-[#10b981] dark:to-[#e5e7eb] flex items-center justify-center text-[#111827] font-bold text-xl animate-[rotate_fade_in_1s_ease]"
                style={{
                  background: `conic-gradient(#10b981 ${overallPercentage}%, #e5e7eb 0)`,
                  '--attendance-percent': overallPercentage / 100
                } as React.CSSProperties}
              >
                {Math.round(overallPercentage)}%
              </div>
            )
          })()}
        </div>
      </div>

      {/* Subject rows */}
      <div className="space-y-6">
        {courses.map((course, index) => {
          const courseAttendance = attendance.filter(a => a.course_id === course.id)
          const totalClasses = courseAttendance.length
          const presentClasses = courseAttendance.filter(a => a.status === 'present').length
          const percentage = totalClasses ? (presentClasses / totalClasses) * 100 : 0

          // Get gradient colors based on subject
          const getSubjectColors = (subjectName: string) => {
            const name = subjectName.toLowerCase()
            if (name.includes('math')) return { start: '#34d399', end: '#10b981' }
            if (name.includes('data') || name.includes('structures')) return { start: '#60a5fa', end: '#2563eb' }
            if (name.includes('behavioural') || name.includes('science')) return { start: '#f472b6', end: '#ec4899' }
            if (name.includes('communication') || name.includes('skills')) return { start: '#fbbf24', end: '#f59e0b' }
            // Default colors
            return { start: '#34d399', end: '#10b981' }
          }

          const colors = getSubjectColors(course.name)

          return (
            <div key={index} className="flex flex-col" data-subject={course.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-300 dark:text-[#374151]">{course.name}</span>
                <span className="text-sm font-medium text-gray-400 dark:text-[#4b5563]">{Math.round(percentage)}%</span>
              </div>

              {/* Progress bar */}
              <div className="relative h-3 bg-[#e5e7eb] rounded-xl overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                <div
                  className="absolute left-0 top-0 h-full rounded-xl animate-[fillGrow_1.2s_ease-out]"
                  style={{
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${colors.start}, ${colors.end})`,
                    '--percent': `${percentage}%`
                  } as React.CSSProperties}
                />
                <span className="absolute right-2 top-[-18px] text-xs font-medium text-gray-400 dark:text-[#4b5563]">
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
