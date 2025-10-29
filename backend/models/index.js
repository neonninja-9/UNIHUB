const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to database');
  release();
});

module.exports = {
  async authenticateUser(email, role) {
    try {
      console.log(`Attempting to authenticate ${role} with email: ${email}`);
      let query;
      if (role === 'student') {
        query = 'SELECT student_id, name, email FROM students WHERE email = $1';
      } else {
        query = 'SELECT faculty_id, name, email FROM faculty WHERE email = $1';
      }
      
      const result = await pool.query(query, [email]);
      console.log('Auth query result:', result.rows);
      return result.rows[0];
    } catch (error) {
      console.error('Error in authenticateUser:', error);
      throw error;
    }
  },

  async getStudents() {
    const result = await pool.query('SELECT * FROM students');
    return result.rows;
  },

  async getStudentById(id) {
    const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);
    return result.rows[0];
  },

  async getCourses() {
    const result = await pool.query('SELECT * FROM courses');
    return result.rows;
  },

  async getStudentAttendance(studentId, courseId) {
    const result = await pool.query(
      'SELECT * FROM attendance WHERE student_id = $1 AND course_id = $2',
      [studentId, courseId]
    );
    return result.rows;
  },

  async getStudentResults(studentId) {
    const result = await pool.query(
      'SELECT r.*, e.course_id, e.exam_date, e.total_marks FROM results r JOIN exams e ON r.exam_id = e.exam_id WHERE r.student_id = $1',
      [studentId]
    );
    return result.rows;
  },

  async getFaculty() {
    const result = await pool.query('SELECT * FROM faculty');
    return result.rows;
  },

  async getFacultyById(id) {
    const result = await pool.query('SELECT * FROM faculty WHERE faculty_id = $1', [id]);
    return result.rows[0];
  },

  async getFacultyTeachingAssignments(facultyId) {
    const result = await pool.query(
      'SELECT t.*, c.name as course_name FROM teaching_assignments t JOIN courses c ON t.course_id = c.course_id WHERE t.faculty_id = $1',
      [facultyId]
    );
    return result.rows;
  },

  async markAttendance(studentId, courseId, date, status) {
    const result = await pool.query(
      'INSERT INTO attendance (attendance_id, student_id, course_id, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [`ATT${Date.now()}`, studentId, courseId, date, status]
    );
    return result.rows[0];
  }
};