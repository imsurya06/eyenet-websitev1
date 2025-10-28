"use client";
import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminCourseFilter from '@/components/AdminCourseFilter'; // Import AdminCourseFilter

const AdminCourses = () => {
  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Courses" />
      <AdminCourseFilter /> {/* Add AdminCourseFilter here */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-foreground text-center">
            Admin Courses Management
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 text-center">
            Manage courses here.
          </p>
        </AnimateOnScroll>
      </div>
    </div>
  );
};
export default AdminCourses;