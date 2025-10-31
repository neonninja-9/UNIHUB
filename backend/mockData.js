module.exports = {
  students: [
    { id: 1, name: "Alex Doe", email: "alex.doe@unihub.com", role: "student" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@unihub.com",
      role: "student",
    },
  ],
  faculty: [
    { id: 1, name: "Emily Reed", email: "e.reed@unihub.com", role: "faculty" },
  ],
  schedules: {
    1: [
      { courseId: 101, name: "Mathematics", time: "Mon 9am" },
      { courseId: 102, name: "Physics", time: "Wed 11am" },
    ],
    2: [{ courseId: 101, name: "Mathematics", time: "Mon 9am" }],
  },
  courses: [
    { id: 101, name: "Mathematics", facultyId: 1 },
    { id: 102, name: "Physics", facultyId: 1 },
  ],
  attendance: [
    { studentId: 1, courseId: 101, date: "2025-10-01", status: "Present" },
    { studentId: 1, courseId: 102, date: "2025-10-02", status: "Absent" },
    { studentId: 2, courseId: 101, date: "2025-10-01", status: "Present" },
  ],
  results: [
    { studentId: 1, courseId: 101, grade: "A" },
    { studentId: 1, courseId: 102, grade: "B+" },
    { studentId: 2, courseId: 101, grade: "A-" },
  ],
  teachingAssignments: [
    { facultyId: 1, courseId: 101 },
    { facultyId: 1, courseId: 102 },
  ],
  notices: [
    { id: 1, message: "Welcome to UniHub!", date: "2025-10-01" },
    { id: 2, message: "Exam schedule released.", date: "2025-10-05" },
  ],
};
