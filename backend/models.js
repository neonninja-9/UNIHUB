const db = require('./db');

const models = {
  // Student-related queries
  async getStudents() {
    const result = await db.query('SELECT * FROM students');
    return result.rows;
  },

  async getStudentById(id) {
    const result = await db.query('SELECT * FROM students WHERE student_id = $1', [id]);
    return result.rows[0];
  },

  async getStudentSchedule(studentId) {
    const query = `
      SELECT 
        c.name as subject,
        c.course_id,
        f.name as teacher,
        ta.assignment_id
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      JOIN teaching_assignments ta ON c.course_id = ta.course_id
      JOIN faculty f ON ta.faculty_id = f.faculty_id
      WHERE e.student_id = $1
    `;
    const result = await db.query(query, [studentId]);
    return result.rows;
  },

  // Faculty-related queries
  async getFaculty() {
    const result = await db.query('SELECT * FROM faculty');
    return result.rows;
  },

  async getFacultyById(id) {
    const result = await db.query('SELECT * FROM faculty WHERE faculty_id = $1', [id]);
    return result.rows[0];
  },

  async getFacultyTeachingAssignments(facultyId) {
    const query = `
      SELECT 
        c.name as course_name,
        c.credits,
        d.name as department
      FROM teaching_assignments ta
      JOIN courses c ON ta.course_id = c.course_id
      JOIN departments d ON c.department_id = d.department_id
      WHERE ta.faculty_id = $1
    `;
    const result = await db.query(query, [facultyId]);
    return result.rows;
  },

  // Course-related queries
  async getCourses() {
    const result = await db.query('SELECT * FROM courses');
    return result.rows;
  },

  async getCourseById(id) {
    const result = await db.query('SELECT * FROM courses WHERE course_id = $1', [id]);
    return result.rows[0];
  },

  // Attendance-related queries
  async getStudentAttendance(studentId, courseId) {
    const query = `
      SELECT date, status
      FROM attendance
      WHERE student_id = $1 AND course_id = $2
      ORDER BY date DESC
    `;
    const result = await db.query(query, [studentId, courseId]);
    return result.rows;
  },

  async markAttendance(studentId, courseId, date, status) {
    const query = `
      INSERT INTO attendance (attendance_id, student_id, course_id, date, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const attendanceId = `ATT${Date.now()}`;
    const result = await db.query(query, [attendanceId, studentId, courseId, date, status]);
    return result.rows[0];
  },

  // Exam and results-related queries
  async getStudentResults(studentId) {
    const query = `
      SELECT 
        e.exam_date,
        c.name as course_name,
        e.total_marks,
        r.marks_obtained
      FROM results r
      JOIN exams e ON r.exam_id = e.exam_id
      JOIN courses c ON e.course_id = c.course_id
      WHERE r.student_id = $1
      ORDER BY e.exam_date DESC
    `;
    const result = await db.query(query, [studentId]);
    return result.rows;
  },

  // Authentication-related queries
  async authenticateUser(email, role) {
    let query;
    if (role === 'student') {
      query = 'SELECT * FROM students WHERE email = $1';
    } else if (role === 'faculty') {
      query = 'SELECT * FROM faculty WHERE email = $1';
    } else {
      throw new Error('Invalid role');
    }
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
};

module.exports = models;