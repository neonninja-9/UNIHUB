const express = require('express');
const cors = require('cors');
require('dotenv').config();
const models = require('./models');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Student routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await models.getStudents();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await models.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students/:id/schedule', async (req, res) => {
  try {
    const schedule = await models.getStudentSchedule(req.params.id);
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Faculty routes
app.get('/api/faculty', async (req, res) => {
  try {
    const faculty = await models.getFaculty();
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/faculty/:id', async (req, res) => {
  try {
    const faculty = await models.getFacultyById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Authentication
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    if (role !== 'student' && role !== 'faculty') {
      return res.status(400).json({ error: 'Invalid role' });
    }

    try {
      const user = await models.authenticateUser(email, role);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // In a real application, you would verify the password here
      // For now, we're accepting any password for demo purposes

      res.json({
        success: true,
        user: {
          id: user[`${role}_id`],
          name: user.name,
          email: user.email,
          role: role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed. Please try again.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Additional routes for results and attendance
app.get('/api/students/:id/attendance', async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }
    const attendance = await models.getStudentAttendance(req.params.id, courseId);
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students/:id/results', async (req, res) => {
  try {
    const results = await models.getStudentResults(req.params.id);
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Faculty teaching assignments
app.get('/api/faculty/:id/teaching', async (req, res) => {
  try {
    const assignments = await models.getFacultyTeachingAssignments(req.params.id);
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching teaching assignments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Course routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await models.getCourses();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Attendance marking (for faculty)
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentId, courseId, date, status } = req.body;
    if (!studentId || !courseId || !date || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const attendance = await models.markAttendance(studentId, courseId, date, status);
    res.json(attendance);
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
