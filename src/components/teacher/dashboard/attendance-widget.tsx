import React, { useState, useRef, useEffect } from "react";
import { mockCourses } from "@/lib/mock-data";
import * as faceapi from "face-api.js";

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
  const [isFaceRecognitionActive, setIsFaceRecognitionActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(
    mockCourses[0]?.id || null,
  );
  const [recognizedStudents, setRecognizedStudents] = useState(new Set());
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [storedFaces, setStoredFaces] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };
    loadModels();
  }, []);

  // Fetch stored face embeddings
  useEffect(() => {
    const fetchStoredFaces = async () => {
      try {
        const response = await fetch("/api/student-faces");
        const faces = await response.json();
        setStoredFaces(faces.filter((f) => f.faceEmbedding));
      } catch (error) {
        console.error("Error fetching stored faces:", error);
      }
    };
    fetchStoredFaces();
  }, []);

  const startFaceRecognition = async () => {
    if (!modelsLoaded) {
      alert("Face recognition models are still loading. Please wait.");
      return;
    }

    setIsFaceRecognitionActive(true);
    setRecognizedStudents(new Set());

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Start detection loop
      const detectFaces = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions(),
          )
          .withFaceLandmarks()
          .withFaceDescriptors();

        const canvas = canvasRef.current;
        const displaySize = {
          width: videoRef.current.width,
          height: videoRef.current.height,
        };
        faceapi.matchDimensions(canvas, displaySize);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize,
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        // Compare with stored faces
        detections.forEach((detection) => {
          storedFaces.forEach((storedFace) => {
            if (storedFace.faceEmbedding) {
              const distance = faceapi.euclideanDistance(
                detection.descriptor,
                storedFace.faceEmbedding,
              );
              if (distance < 0.6) {
                // Threshold for recognition
                setRecognizedStudents(
                  (prev) => new Set([...prev, storedFace.studentId]),
                );
                // Mark attendance automatically
                handleMark(selectedCourse, storedFace.studentId, "present");
              }
            }
          });
        });

        if (isFaceRecognitionActive) {
          requestAnimationFrame(detectFaces);
        }
      };

      detectFaces();
    } catch (error) {
      console.error("Error starting face recognition:", error);
      alert("Error accessing camera. Please check permissions.");
    }
  };

  const stopFaceRecognition = () => {
    setIsFaceRecognitionActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

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

      {/* Face Recognition Section */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Face Recognition Attendance
        </h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Course:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {mockCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mb-3">
          <button
            onClick={startFaceRecognition}
            disabled={isFaceRecognitionActive || !modelsLoaded}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {modelsLoaded ? "Start Face Recognition" : "Loading Models..."}
          </button>
          <button
            onClick={stopFaceRecognition}
            disabled={!isFaceRecognitionActive}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
          >
            Stop
          </button>
        </div>
        {isFaceRecognitionActive && (
          <div className="relative mb-3">
            <video
              ref={videoRef}
              width="320"
              height="240"
              className="border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0"
              width="320"
              height="240"
            />
          </div>
        )}
        {recognizedStudents.size > 0 && (
          <div className="text-sm text-green-600 dark:text-green-400">
            Recognized Students: {Array.from(recognizedStudents).join(", ")}
          </div>
        )}
      </div>

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
