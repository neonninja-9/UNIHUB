import React, { useState } from "react";
import { mockCourses } from "@/lib/mock-data";

const mockStudents = [
  { id: 1, name: "Alex Doe", email: "alex.doe@unihub.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@unihub.com" },
  { id: 3, name: "Tom Brown", email: "tom.brown@unihub.com" },
];

const attendanceStatuses = ["present", "absent", "late"];

export function AttendanceWidget() {
  const today = new Date().toISOString().split("T")[0];
  // Track: {
  //   [courseId]: { [studentId]: 'present'|'absent'|'late' }
  // }
  const [attendance, setAttendance] = useState(() => {
    const initial = {};
    mockCourses.forEach((course) => {
      initial[course.id] = {};
      mockStudents.forEach((s) => {
        initial[course.id][s.id] = "present";
      });
    });
    return initial;
  });

  const [saved, setSaved] = useState(false);

  function handleMark(courseId, studentId, status) {
    setAttendance((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [studentId]: status,
      },
    }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    // Here you would call the real API to save attendance.
  }
  function handleReset() {
    setAttendance(() => {
      const initial = {};
      mockCourses.forEach((course) => {
        initial[course.id] = {};
        mockStudents.forEach((s) => {
          initial[course.id][s.id] = "present";
        });
      });
      return initial;
    });
    setSaved(false);
  }

  return (
    <div className="bg-white dark:bg-[#181e34] rounded-xl shadow-lg p-6 mb-8 w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Attendance Marking
      </h2>
      <p className="mb-4 text-xs text-gray-400 dark:text-gray-400">
        Today's Date:{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {today}
        </span>
      </p>
      {mockCourses.map((course) => (
        <div key={course.id} className="mb-6">
          <div className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-lg">
            {course.title}
          </div>
          <table className="w-full text-left mb-3">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className="py-1 px-2">Student</th>
                <th className="py-1 px-2">Email</th>
                <th className="py-1 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a2238] transition"
                >
                  <td className="py-1 px-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {student.name}
                  </td>
                  <td className="py-1 px-2 text-xs text-gray-600 dark:text-gray-300">
                    {student.email}
                  </td>
                  <td className="py-1 px-2">
                    <div className="flex gap-1">
                      {attendanceStatuses.map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            handleMark(course.id, student.id, status)
                          }
                          className={`text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-600 font-medium transition
                            ${
                              attendance[course.id][student.id] === status
                                ? "bg-blue-600 text-white dark:bg-blue-500"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                            }
                          `}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="flex gap-3 justify-end mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700 transition"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Attendance
        </button>
      </div>
      {saved && (
        <div className="mt-4 text-green-600 dark:text-green-400 text-sm font-semibold">
          Attendance saved!
        </div>
      )}
    </div>
  );
}
