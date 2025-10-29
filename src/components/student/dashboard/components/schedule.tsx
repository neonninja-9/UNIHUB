import { Course } from '@/lib/types'

interface ScheduleProps {
  courses: Course[]
}

export function Schedule({ courses }: ScheduleProps) {
  return (
    <div className="bg-[#1A1F3A] rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2">Class Schedule</h3>
      <div className="text-sm text-gray-400 mb-4">Today</div>
      <div className="space-y-3">
        {courses.map((course, index) => {
          // Skip if schedule is not defined or empty
          if (!course.schedule || course.schedule.trim() === '') return null

          // Parse schedule string - assuming format like "Mon,Wed 09:15-10:10"
          const [days, time] = course.schedule.split(' ')
          if (!days || !time) return null

          const [startTime, endTime] = time.split('-')
          if (!startTime || !endTime) return null

          // Get current day
          const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
          if (!days.includes(today.slice(0,3))) return null

          return (
            <div key={course.id} className="flex gap-3">
              <div className={`w-1 ${
                index % 3 === 0 ? 'bg-green-500' :
                index % 3 === 1 ? 'bg-red-500' :
                'bg-blue-500'
              } rounded-full`}></div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{`${startTime} - ${endTime}`}</div>
                <div className="text-sm text-gray-300">{course.name.toUpperCase()}</div>
                <div className="text-xs text-gray-500">
                  Room {course.classroom || 'TBD'}
                </div>
              </div>
            </div>
          )
        })}

        <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm mt-4">
          View Full Timetable
        </button>
      </div>
    </div>
  )
}