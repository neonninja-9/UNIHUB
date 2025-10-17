"use client";

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/Card';

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: number;
}

interface ScheduleItem {
  id: number;
  time: string;
  subject: string;
  teacher: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface Mark {
  id: number;
  subject: string;
  score: number;
}

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
          window.location.href = '/';
          return;
        }

        const user = JSON.parse(userData);

        // Fetch student data
        const studentResponse = await fetch(`http://localhost:5000/api/students/${user.id}`);
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudent(studentData);
        } else {
          // If student not found in mock data, create a mock student based on user data
          setStudent({
            id: user.id,
            name: user.name,
            email: user.email,
            attendance: 85 // Default attendance
          });
        }

        // Fetch schedule
        const scheduleResponse = await fetch(`http://localhost:5000/api/students/${user.id}/schedule`);
        if (scheduleResponse.ok) {
          const scheduleData = await scheduleResponse.json();
          setSchedule(scheduleData);
        } else {
          // If no schedule found, set empty array
          setSchedule([]);
        }

        // Fetch notices
        const noticesResponse = await fetch('http://localhost:5000/api/notices');
        if (noticesResponse.ok) {
          const noticesData = await noticesResponse.json();
          setNotices(noticesData);
        } else {
          setNotices([]);
        }

        // For now, we'll use static marks data since we don't have the endpoint
        setMarks([
          { id: 1, subject: "Mathematics", score: 88 },
          { id: 2, subject: "Physics", score: 95 },
          { id: 3, subject: "Computer Science", score: 91 },
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout>
        <div className="text-center text-red-600">Failed to load student data</div>
      </Layout>
    );
  }

  const navLinks = [
    { href: '/student/dashboard', label: 'Dashboard' },
    { href: '/student/dashboard', label: 'My Calendar' },
    { href: '/student/dashboard', label: 'My Courses' },
    { href: '/student/dashboard', label: 'Time Table' },
    { href: '/student/dashboard', label: 'My Faculty' },
    { href: '/student/dashboard', label: 'Examination' },
    { href: '/student/dashboard', label: 'Fee Details' },
    { href: '/student/dashboard', label: 'Scholarship' },
    { href: '/student/dashboard', label: 'Hostel' },
  ];

  return (
    <Layout
      user={{ name: student.name, role: 'Student' }}
      navLinks={navLinks}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {student.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Here is your academic overview for today.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Attendance */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Overall Attendance</h3>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.attendance}%</div>
                <p className="text-sm text-gray-600">
                  Keep up the great work!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Marks */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Recent Marks</h3>
                <p className="text-sm text-gray-600">
                  Your latest scores across different subjects.
                </p>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Subject</th>
                      <th className="text-right py-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark) => (
                      <tr key={mark.id} className="border-b">
                        <td className="py-2">{mark.subject}</td>
                        <td className="text-right py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            mark.score > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {mark.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
             {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Today's Schedule</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {schedule.map((item) => (
                    <li key={item.id} className="flex items-start gap-4">
                      <div className="text-sm font-medium text-gray-600 w-24">{item.time}</div>
                      <div>
                        <p className="font-semibold">{item.subject}</p>
                        <p className="text-xs text-gray-600">{item.teacher}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Notice Board */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Notice Board</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {notices.slice(0, 2).map((notice) => (
                    <li key={notice.id}>
                        <h4 className="font-semibold">{notice.title}</h4>
                        <p className="text-sm text-gray-600">{notice.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notice.created_at).toLocaleDateString()}
                        </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
