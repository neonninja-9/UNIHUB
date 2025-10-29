-- Database schema for UNIHUB

-- Create tables
CREATE TABLE admins (
    admin_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE departments (
    department_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE faculty (
    faculty_id VARCHAR(255) PRIMARY KEY,
    department_id VARCHAR(255) REFERENCES departments(department_id),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE students (
    student_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    dob DATE,
    department_id VARCHAR(255) REFERENCES departments(department_id)
);

CREATE TABLE courses (
    course_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    credits INTEGER,
    department_id VARCHAR(255) REFERENCES departments(department_id)
);

CREATE TABLE teaching_assignments (
    assignment_id VARCHAR(255) PRIMARY KEY,
    course_id VARCHAR(255) REFERENCES courses(course_id),
    faculty_id VARCHAR(255) REFERENCES faculty(faculty_id)
);

CREATE TABLE exams (
    exam_id VARCHAR(255) PRIMARY KEY,
    exam_date DATE,
    total_marks INTEGER,
    course_id VARCHAR(255) REFERENCES courses(course_id)
);

CREATE TABLE enrollments (
    enrollment_id VARCHAR(255) PRIMARY KEY,
    enrollment_date DATE,
    student_id VARCHAR(255) REFERENCES students(student_id),
    course_id VARCHAR(255) REFERENCES courses(course_id)
);

CREATE TABLE attendance (
    attendance_id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES students(student_id),
    date DATE,
    status VARCHAR(255),
    course_id VARCHAR(255) REFERENCES courses(course_id)
);

CREATE TABLE results (
    result_id VARCHAR(255) PRIMARY KEY,
    exam_id VARCHAR(255) REFERENCES exams(exam_id),
    marks_obtained INTEGER,
    student_id VARCHAR(255) REFERENCES students(student_id)
);

-- Insert sample data for testing
INSERT INTO departments (department_id, name, location) VALUES
('DEPT001', 'Computer Science', 'Block A'),
('DEPT002', 'Physics', 'Block B'),
('DEPT003', 'Mathematics', 'Block C');

INSERT INTO faculty (faculty_id, department_id, name, email, phone) VALUES
('FAC001', 'DEPT001', 'Ms. Sarah Wilson', 's.wilson@unihub.com', '1234567890'),
('FAC002', 'DEPT002', 'Dr. Evelyn Reed', 'e.reed@unihub.com', '2345678901'),
('FAC003', 'DEPT003', 'Mr. David Brown', 'd.brown@unihub.com', '3456789012');

INSERT INTO students (student_id, name, email, phone, dob, department_id) VALUES
('STU001', 'Alex Doe', 'alex.doe@unihub.com', '4567890123', '2000-01-01', 'DEPT001'),
('STU002', 'John Smith', 'john.smith@unihub.com', '5678901234', '2000-02-02', 'DEPT002'),
('STU003', 'Emma Johnson', 'emma.johnson@unihub.com', '6789012345', '2000-03-03', 'DEPT003');

INSERT INTO courses (course_id, name, credits, department_id) VALUES
('CRS001', 'Introduction to Programming', 3, 'DEPT001'),
('CRS002', 'Quantum Physics', 4, 'DEPT002'),
('CRS003', 'Advanced Calculus', 4, 'DEPT003');

INSERT INTO teaching_assignments (assignment_id, course_id, faculty_id) VALUES
('ASG001', 'CRS001', 'FAC001'),
('ASG002', 'CRS002', 'FAC002'),
('ASG003', 'CRS003', 'FAC003');