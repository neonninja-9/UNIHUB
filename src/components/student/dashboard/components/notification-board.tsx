interface NotificationBoardProps {
  onNotificationClick?: (notification: any) => void
}

import React from 'react'

export function NotificationBoard({ onNotificationClick }: NotificationBoardProps) {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: 'Assignment Due',
      message: 'Math homework due tomorrow',
      time: '2 hours ago',
      type: 'warning',
      read: false
    },
    {
      id: 2,
      title: 'Class Cancelled',
      message: 'Physics class on Friday is cancelled',
      time: '1 day ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Grade Posted',
      message: 'Your Chemistry grade has been posted',
      time: '3 days ago',
      type: 'success',
      read: false
    }
  ])

  return (
    <div className="bg-[#1A1F3A] rounded-xl p-6 dark:bg-white dark:border dark:border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-white dark:text-gray-900">Notifications</h3>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 border-blue-500 pl-4 py-2 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-50 rounded-r-lg transition-all duration-200 hover:scale-105 ${!notification.read ? 'ring-2 ring-blue-500/50' : ''}`}
            onClick={() => {
              setNotifications(prev => prev.map(n =>
                n.id === notification.id ? { ...n, read: true } : n
              ))
              onNotificationClick?.(notification)
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-white dark:text-gray-900">{notification.title}</h4>
                <p className="text-xs text-gray-300 mt-1 dark:text-gray-600">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm mt-4 dark:text-blue-600 dark:hover:text-blue-700">
        View All Notifications
      </button>
    </div>
  )
}
