"use client";

import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject?: string;
}

interface Student {
  id: number;
  name: string;
}

export default function TeacherDashboardPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  const [fileName, setFileName] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
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

        // Fetch teacher data
        const teacherResponse = await fetch(`http://localhost:5000/api/teachers/${user.id}`);
        const teacherData = await teacherResponse.json();
        setTeacher(teacherData);

        // Fetch students
        const studentsResponse = await fetch('http://localhost:5000/api/students');
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);

        // Initialize attendance state
        const initialAttendance: { [key: number]: boolean } = {};
        studentsData.forEach((student: Student) => {
          initialAttendance[student.id] = false;
        });
        setAttendance(initialAttendance);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, this would save to the database
    alert('Attendance saved successfully!');
  };

  const handleFileUpload = () => {
    if (fileName.trim()) {
      setUploadedFiles(prev => [...prev, fileName]);
      setFileName('');
      alert('File uploaded successfully!');
    }
  };

  const handlePostNotice = () => {
    if (noticeTitle.trim() && noticeContent.trim()) {
      // In a real app, this would save to the database
      alert('Notice posted successfully!');
      setNoticeTitle('');
      setNoticeContent('');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!teacher) {
    return (
      <Layout>
        <div className="text-center text-red-600">Failed to load teacher data</div>
      </Layout>
    );
  }

  const navLinks = [
    { href: '/teacher/dashboard', label: 'Dashboard' },
    { href: '/teacher/dashboard', label: 'AI Insights' },
  ];

  return (
    <Layout
      user={{ name: teacher.name, role: 'Teacher' }}
      navLinks={navLinks}
    >
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Teacher Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-medium">Class Performance</h3>
                        <p className="text-sm text-gray-600">Average scores and pass rates across subjects.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Mathematics</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                              </div>
                              <span className="text-sm">75%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Physics</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                              </div>
                              <span className="text-sm">78%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Computer Science</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-sm">85%</span>
                            </div>
                          </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-medium">Manage Attendance</h3>
                        <p className="text-sm text-gray-600">Mark attendance for today's class.</p>
                    </CardHeader>
                    <CardContent>
                         <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                <th className="text-left py-2">Present</th>
                                <th className="text-left py-2">Student Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                <tr key={student.id} className="border-b">
                                    <td className="py-2">
                                        <input
                                          type="checkbox"
                                          checked={attendance[student.id] || false}
                                          onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                                          className="w-4 h-4"
                                        />
                                    </td>
                                    <td className="py-2 font-medium">{student.name}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                    <div className="px-6 pb-4">
                        <Button onClick={handleSaveAttendance}>Save Attendance</Button>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader>
                        <h3 className="text-lg font-medium">Upload Resources</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                          type="text"
                          placeholder="File name..."
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                        />
                        <Button onClick={handleFileUpload} className="w-full">
                          Upload File
                        </Button>
                         <h4 className="text-sm font-medium text-gray-700 pt-4">Recently Uploaded</h4>
                         <ul className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <span className="flex-1 truncate">{file}</span>
                                    <span className="text-gray-500">Just now</span>
                                </li>
                            ))}
                         </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-medium">Post Announcement</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                          placeholder="Notice title..."
                          value={noticeTitle}
                          onChange={(e) => setNoticeTitle(e.target.value)}
                        />
                        <textarea
                          rows={3}
                          placeholder="Notice content..."
                          value={noticeContent}
                          onChange={(e) => setNoticeContent(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </CardContent>
                     <div className="px-6 pb-4">
                        <Button onClick={handlePostNotice} className="w-full">
                          Post to Notice Board
                        </Button>
                     </div>
                </Card>
            </div>
        </div>
      </div>
    </Layout>
  );
}
