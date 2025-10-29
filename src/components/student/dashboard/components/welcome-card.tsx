import { Student } from '@/lib/types'

interface WelcomeCardProps {
  student?: Student
}

export function WelcomeCard({ student }: WelcomeCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-2">Good morning, {student?.name || 'Student'} 👋</h2>
      <p className="text-purple-200">Welcome back! Here's your dashboard for today.</p>
    </div>
  )
}