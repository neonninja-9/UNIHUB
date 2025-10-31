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
  // New data for face recognition
  studentFaces: [
    { studentId: 1, faceEmbedding: null }, // Will store face embeddings
    { studentId: 2, faceEmbedding: null },
  ],
  faceAttendance: [], // Store face-based attendance records
  // New data for DigiLocker documents
  studentDocuments: {
    1: [
      {
        id: "1",
        name: "Class 10 Marksheet",
        type: "Academic Certificate",
        issuer: "Central Board of Secondary Education",
        issueDate: "2020-05-15",
        status: "active",
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: "2",
        name: "Class 12 Marksheet",
        type: "Academic Certificate",
        issuer: "Central Board of Secondary Education",
        issueDate: "2022-05-20",
        status: "active",
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: "3",
        name: "Bachelor Degree Certificate",
        type: "Degree Certificate",
        issuer: "University of Delhi",
        issueDate: "2024-06-10",
        status: "pending",
        downloadUrl: "#",
        previewUrl: "#",
      },
      {
        id: "4",
        name: "Aadhaar Card",
        type: "Identity Document",
        issuer: "Unique Identification Authority of India",
        issueDate: "2018-03-12",
        status: "active",
        downloadUrl: "#",
        previewUrl: "#",
      },
    ],
    2: [
      {
        id: "5",
        name: "Class 10 Marksheet",
        type: "Academic Certificate",
        issuer: "Central Board of Secondary Education",
        issueDate: "2020-05-15",
        status: "active",
        downloadUrl: "#",
        previewUrl: "#",
      },
    ],
  },
};
