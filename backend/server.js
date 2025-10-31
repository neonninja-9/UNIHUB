const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mockData = require("./mockData");

const app = express();
const PORT = process.env.BACKEND_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Student routes
app.get("/api/students", (req, res) => {
  res.json(mockData.students);
});

app.get("/api/students/:id", (req, res) => {
  const student = mockData.students.find((s) => String(s.id) === req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

app.get("/api/students/:id/schedule", (req, res) => {
  const schedule = mockData.schedules[req.params.id] || [];
  res.json(schedule);
});

// Faculty routes
app.get("/api/faculty", (req, res) => {
  res.json(mockData.faculty);
});

app.get("/api/faculty/:id", (req, res) => {
  const faculty = mockData.faculty.find((f) => String(f.id) === req.params.id);
  if (!faculty)
    return res.status(404).json({ error: "Faculty member not found" });
  res.json(faculty);
});

// Authentication
app.post("/api/login", (req, res) => {
  const { email, role } = req.body;
  let user;
  if (role === "student") {
    user = mockData.students.find((u) => u.email === email);
  } else if (role === "faculty") {
    user = mockData.faculty.find((u) => u.email === email);
  }
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role },
  });
});

// Additional routes for results and attendance
app.get("/api/students/:id/attendance", (req, res) => {
  const { courseId } = req.query;
  const attendance = mockData.attendance.filter(
    (a) =>
      String(a.studentId) === req.params.id &&
      (!courseId || String(a.courseId) === String(courseId)),
  );
  res.json(attendance);
});

app.get("/api/students/:id/results", (req, res) => {
  const results = mockData.results.filter(
    (r) => String(r.studentId) === req.params.id,
  );
  res.json(results);
});

// Faculty teaching assignments
app.get("/api/faculty/:id/teaching", (req, res) => {
  const assignments = mockData.teachingAssignments.filter(
    (t) => String(t.facultyId) === req.params.id,
  );
  res.json(assignments);
});

// Course routes
app.get("/api/courses", (req, res) => {
  res.json(mockData.courses);
});

// Attendance marking (for faculty)
app.post("/api/attendance", (req, res) => {
  // Just echo request in mock server
  res.json({ success: true, ...req.body });
});

// Face recognition routes
app.get("/api/student-faces", (req, res) => {
  res.json(mockData.studentFaces);
});

app.post("/api/student-faces/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { faceEmbedding } = req.body;
  const faceIndex = mockData.studentFaces.findIndex(
    (f) => f.studentId === parseInt(studentId),
  );
  if (faceIndex !== -1) {
    mockData.studentFaces[faceIndex].faceEmbedding = faceEmbedding;
    res.json({ success: true, message: "Face embedding stored" });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.post("/api/face-attendance", (req, res) => {
  const { studentId, courseId, date } = req.body;
  const record = {
    studentId,
    courseId,
    date,
    status: "present",
    method: "face-recognition",
  };
  mockData.faceAttendance.push(record);
  res.json({ success: true, record });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
