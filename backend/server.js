const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Mock data for students
const mockStudents = [
  { id: 1, name: 'Alex Doe', email: 'alex.doe@unihub.com', attendance: 92.5 },
  { id: 2, name: 'John Smith', email: 'john.smith@unihub.com', attendance: 88.0 },
  { id: 3, name: 'Emma Johnson', email: 'emma.johnson@unihub.com', attendance: 95.2 },
];

// Mock data for teachers
const mockTeachers = [
  { id: 1, name: 'Dr. Evelyn Reed', email: 'e.reed@unihub.com', subject: 'Physics' },
  { id: 2, name: 'Mr. David Brown', email: 'd.brown@unihub.com', subject: 'Mathematics' },
  { id: 3, name: 'Ms. Sarah Wilson', email: 's.wilson@unihub.com', subject: 'Computer Science' },
];

// Get all students
app.get('/api/students', (req, res) => {
  res.json(mockStudents);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const student = mockStudents.find(s => s.id === parseInt(id));
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// Get all teachers
app.get('/api/teachers', (req, res) => {
  res.json(mockTeachers);
});

// Get teacher by ID
app.get('/api/teachers/:id', (req, res) => {
  const { id } = req.params;
  const teacher = mockTeachers.find(t => t.id === parseInt(id));
  if (!teacher) {
    return res.status(404).json({ error: 'Teacher not found' });
  }
  res.json(teacher);
});

// Login endpoint (mock authentication - accepts any email/password)
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  if (role !== 'student' && role !== 'teacher') {
    return res.status(400).json({ error: 'Invalid role' });
  }

  // Mock user data based on role
  let user;
  if (role === 'student') {
    user = mockStudents.find(s => s.email === email) || {
      id: Date.now(), // Generate a simple ID
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      attendance: 0
    };
  } else {
    user = mockTeachers.find(t => t.email === email) || {
      id: Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      subject: 'General'
    };
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role
    }
  });
});

// Mock schedule data
const mockSchedule = [
  { id: 1, student_id: 1, time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. David Brown', day: 'Monday' },
  { id: 2, student_id: 1, time: '10:00 - 11:00', subject: 'Physics', teacher: 'Dr. Evelyn Reed', day: 'Monday' },
  { id: 3, student_id: 1, time: '11:15 - 12:15', subject: 'Computer Science', teacher: 'Ms. Sarah Wilson', day: 'Monday' },
  { id: 4, student_id: 1, time: '13:30 - 14:30', subject: 'English', teacher: 'Mr. Robert Lee', day: 'Monday' },
];

// Mock notices data
const mockNotices = [
  { id: 1, title: 'Mid-term Examinations', content: 'The mid-term examination schedule has been posted. Please check the main notice board for details.', created_at: '2023-10-01T00:00:00Z' },
  { id: 2, title: 'Annual Sports Day', content: 'Registrations for the annual sports day are now open. Contact the sports committee for more information.', created_at: '2023-10-02T00:00:00Z' },
  { id: 3, title: 'Library Hours Extended', content: 'The library will now remain open until 8 PM on weekdays for better study facilities.', created_at: '2023-10-03T00:00:00Z' },
];

// Get schedule for a student
app.get('/api/students/:id/schedule', (req, res) => {
  const { id } = req.params;
  const schedule = mockSchedule.filter(s => s.student_id === parseInt(id));
  res.json(schedule);
});

// Get notices
app.get('/api/notices', (req, res) => {
  res.json(mockNotices);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
