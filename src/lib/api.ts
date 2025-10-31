import {
  ApiResponse,
  LoginResponse,
  Student,
  Faculty,
  Course,
  Attendance,
  Grade as Result,
  TeachingAssignment,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }
  return data as ApiResponse<T>;
}

// Generic fetch function with auth
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// API Functions
export const api = {
  // Auth
  async login(
    username: string,
    password: string,
    role: "student" | "faculty",
  ): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password, role }),
    });
    return handleResponse<LoginResponse>(response);
  },

  // Students
  async getStudents(): Promise<ApiResponse<Student[]>> {
    return fetchWithAuth<Student[]>("/api/students");
  },

  async getStudent(id: number): Promise<ApiResponse<Student>> {
    return fetchWithAuth<Student>(`/api/students/${id}`);
  },

  async getStudentSchedule(id: string) {
    return fetchWithAuth(`/api/students/${id}/schedule`);
  },

  async getStudentAttendance(
    studentId: number,
    courseId: number,
  ): Promise<ApiResponse<Attendance[]>> {
    return fetchWithAuth<Attendance[]>(
      `/api/students/${studentId}/attendance?courseId=${courseId}`,
    );
  },

  async getStudentResults(id: number): Promise<ApiResponse<Result[]>> {
    return fetchWithAuth<Result[]>(`/api/students/${id}/results`);
  },

  // Faculty
  async getFaculty(): Promise<ApiResponse<Faculty[]>> {
    return fetchWithAuth<Faculty[]>("/api/faculty");
  },

  async getFacultyMember(id: string): Promise<ApiResponse<Faculty>> {
    return fetchWithAuth<Faculty>(`/api/faculty/${id}`);
  },

  async getFacultyTeaching(
    id: string,
  ): Promise<ApiResponse<TeachingAssignment[]>> {
    return fetchWithAuth<TeachingAssignment[]>(`/api/faculty/${id}/teaching`);
  },

  // Courses
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return fetchWithAuth<Course[]>("/api/courses");
  },

  // Attendance
  async markAttendance(
    studentId: string,
    courseId: string,
    date: string,
    status: string,
  ): Promise<ApiResponse<Attendance>> {
    return fetchWithAuth<Attendance>("/api/attendance", {
      method: "POST",
      body: JSON.stringify({ studentId, courseId, date, status }),
    });
  },

  // Results/Grades
  async submitGrade(data: Partial<Result>): Promise<ApiResponse<Result>> {
    return fetchWithAuth<Result>("/api/grades", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateGrade(
    id: number,
    data: Partial<Result>,
  ): Promise<ApiResponse<Result>> {
    return fetchWithAuth<Result>(`/api/grades/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
