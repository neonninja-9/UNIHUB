import { BookOpen, Users, AlertCircle, Award } from 'lucide-react'
import { Grade, Attendance, Course } from '@/lib/types'

interface StatsCardsProps {
  grades: Grade[]
  attendance: Attendance[]
  courses: Course[]
}

export function StatsCards({ grades, attendance, courses }: StatsCardsProps) {
  const calculateGPA = () => {
    const completedGrades = grades.filter(g => g.marks_obtained !== null)
    const totalPoints = completedGrades.reduce((sum, grade) => {
      const percentage = (grade.marks_obtained || 0) / grade.total_marks
      // Convert percentage to 4.0 scale
      let points = 0
      if (percentage >= 0.9) points = 4.0
      else if (percentage >= 0.8) points = 3.5
      else if (percentage >= 0.7) points = 3.0
      else if (percentage >= 0.6) points = 2.5
      else if (percentage >= 0.5) points = 2.0
      else points = 1.0
      return sum + points
    }, 0)
    return completedGrades.length ? (totalPoints / completedGrades.length).toFixed(2) : 'N/A'
  }

  const calculateAttendance = () => {
    const totalClasses = attendance.length
    const presentClasses = attendance.filter(a => a.status === 'present').length
    return totalClasses ? `${Math.round((presentClasses / totalClasses) * 100)}%` : 'N/A'
  }

  const pendingTasks = grades.filter(g => g.marks_obtained === null).length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<BookOpen className="w-5 h-5 text-green-400" />}
        iconBg="bg-green-500/20"
        label="CGPA"
        value={calculateGPA()}
      />
      
      <StatCard
        icon={<Users className="w-5 h-5 text-blue-400" />}
        iconBg="bg-blue-500/20"
        label="Attendance"
        value={calculateAttendance()}
      />
      
      <StatCard
        icon={<AlertCircle className="w-5 h-5 text-purple-400" />}
        iconBg="bg-purple-500/20"
        label="Pending Tasks"
        value={pendingTasks}
      />
      
      <StatCard
        icon={<Award className="w-5 h-5 text-yellow-400" />}
        iconBg="bg-yellow-500/20"
        label="Courses"
        value={courses.length}
      />
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string | number
}

function StatCard({ icon, iconBg, label, value }: StatCardProps) {
  return (
    <div className="bg-[#1A1F3A] rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}