import { Search, Bell, Moon } from 'lucide-react'
import { Student } from '@/lib/types'

interface HeaderProps {
  student?: Student
}

export function DashboardHeader({ student }: HeaderProps) {
  return (
    <header className="bg-[#1A1F3A] border-b border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-blue-400">UNIHUB</h1>
          <span className="text-gray-400 text-sm">Student Portal</span>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#0A0E27] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Moon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
              {student?.name?.slice(0, 2).toUpperCase() || 'ST'}
            </div>
            <div className="text-sm">
              <div className="font-semibold">{student?.name || 'Loading...'}</div>
              <div className="text-gray-400 text-xs">Student</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}