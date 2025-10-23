'use client'
import React from 'react';
import StudentLayout from '@/components/student/student-layout';
import { mockStudent, mockStudentCourses } from '@/lib/student-mock-data';
import { CourseCard } from '@/components/student/dashboard/course-card';
import { RecentGrades } from '@/components/student/dashboard/recent-grades';
import { UpcomingEvents } from '@/components/student/dashboard/upcoming-events';

const StudentDashboardPage = () => {
  return (
    <StudentLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {mockStudentCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
              ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentGrades />
          </div>
        </div>
        <div className="lg:col-span-1">
          <UpcomingEvents />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboardPage;
