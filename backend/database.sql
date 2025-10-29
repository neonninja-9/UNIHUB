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

-- Add more courses for John Smith
INSERT INTO courses (course_id, name, credits, department_id) VALUES
('CRS004', 'Data Structures', 3, 'DEPT001'),
('CRS005', 'Linear Algebra', 4, 'DEPT003'),
('CRS006', 'Chemistry', 3, 'DEPT002');

-- Add enrollments for John Smith (STU002)
INSERT INTO enrollments (enrollment_id, enrollment_date, student_id, course_id) VALUES
('ENR001', '2024-01-15', 'STU002', 'CRS001'),
('ENR002', '2024-01-15', 'STU002', 'CRS002'),
('ENR003', '2024-01-15', 'STU002', 'CRS004'),
('ENR004', '2024-01-15', 'STU002', 'CRS005'),
('ENR005', '2024-01-15', 'STU002', 'CRS006');

-- Add exams
INSERT INTO exams (exam_id, exam_date, total_marks, course_id) VALUES
('EXM001', '2024-03-15', 100, 'CRS001'),
('EXM002', '2024-04-20', 100, 'CRS002'),
('EXM003', '2024-05-10', 100, 'CRS004'),
('EXM004', '2024-06-05', 100, 'CRS005'),
('EXM005', '2024-07-15', 100, 'CRS006');

-- Add results for John Smith (STU002) - CGPA calculation: (85+78+92+88+75)/5 = 83.6
INSERT INTO results (result_id, exam_id, marks_obtained, student_id) VALUES
('RES001', 'EXM001', 85, 'STU002'), -- Intro to Programming
('RES002', 'EXM002', 78, 'STU002'), -- Quantum Physics
('RES003', 'EXM003', 92, 'STU002'), -- Data Structures
('RES004', 'EXM004', 88, 'STU002'), -- Linear Algebra
('RES005', 'EXM005', 75, 'STU002'); -- Chemistry

-- Add attendance records for John Smith (STU002) - Overall attendance ~85%
-- For CRS001 (Intro to Programming) - 85% attendance
INSERT INTO attendance (attendance_id, student_id, date, status, course_id) VALUES
('ATT001', 'STU002', '2024-01-20', 'present', 'CRS001'),
('ATT002', 'STU002', '2024-01-27', 'present', 'CRS001'),
('ATT003', 'STU002', '2024-02-03', 'absent', 'CRS001'),
('ATT004', 'STU002', '2024-02-10', 'present', 'CRS001'),
('ATT005', 'STU002', '2024-02-17', 'present', 'CRS001'),
('ATT006', 'STU002', '2024-02-24', 'present', 'CRS001'),
('ATT007', 'STU002', '2024-03-03', 'late', 'CRS001'),
('ATT008', 'STU002', '2024-03-10', 'present', 'CRS001');

-- For CRS002 (Quantum Physics) - 80% attendance
INSERT INTO attendance (attendance_id, student_id, date, status, course_id) VALUES
('ATT009', 'STU002', '2024-01-22', 'present', 'CRS002'),
('ATT010', 'STU002', '2024-01-29', 'absent', 'CRS002'),
('ATT011', 'STU002', '2024-02-05', 'present', 'CRS002'),
('ATT012', 'STU002', '2024-02-12', 'present', 'CRS002'),
('ATT013', 'STU002', '2024-02-19', 'present', 'CRS002'),
('ATT014', 'STU002', '2024-02-26', 'absent', 'CRS002'),
('ATT015', 'STU002', '2024-03-05', 'present', 'CRS002'),
('ATT016', 'STU002', '2024-03-12', 'present', 'CRS002');

-- For CRS004 (Data Structures) - 90% attendance
INSERT INTO attendance (attendance_id, student_id, date, status, course_id) VALUES
('ATT017', 'STU002', '2024-01-25', 'present', 'CRS004'),
('ATT018', 'STU002', '2024-02-01', 'present', 'CRS004'),
('ATT019', 'STU002', '2024-02-08', 'present', 'CRS004'),
('ATT020', 'STU002', '2024-02-15', 'present', 'CRS004'),
('ATT021', 'STU002', '2024-02-22', 'present', 'CRS004'),
('ATT022', 'STU002', '2024-03-01', 'late', 'CRS004'),
('ATT023', 'STU002', '2024-03-08', 'present', 'CRS004'),
('ATT024', 'STU002', '2024-03-15', 'present', 'CRS004');

-- For CRS005 (Linear Algebra) - 88% attendance
INSERT INTO attendance (attendance_id, student_id, date, status, course_id) VALUES
('ATT025', 'STU002', '2024-01-18', 'present', 'CRS005'),
('ATT026', 'STU002', '2024-01-25', 'present', 'CRS005'),
('ATT027', 'STU002', '2024-02-01', 'absent', 'CRS005'),
('ATT028', 'STU002', '2024-02-08', 'present', 'CRS005'),
('ATT029', 'STU002', '2024-02-15', 'present', 'CRS005'),
('ATT030', 'STU002', '2024-02-22', 'present', 'CRS005'),
('ATT031', 'STU002', '2024-03-01', 'present', 'CRS005'),
('ATT032', 'STU002', '2024-03-08', 'present', 'CRS005');

-- For CRS006 (Chemistry) - 82% attendance
INSERT INTO attendance (attendance_id, student_id, date, status, course_id) VALUES
('ATT033', 'STU002', '2024-01-21', 'present', 'CRS006'),
('ATT034', 'STU002', '2024-01-28', 'absent', 'CRS006'),
('ATT035', 'STU002', '2024-02-04', 'present', 'CRS006'),
('ATT036', 'STU002', '2024-02-11', 'present', 'CRS006'),
('ATT037', 'STU002', '2024-02-18', 'present', 'CRS006'),
('ATT038', 'STU002', '2024-02-25', 'absent', 'CRS006'),
('ATT039', 'STU002', '2024-03-04', 'present', 'CRS006'),
('ATT040', 'STU002', '2024-03-11', 'late', 'CRS006');
