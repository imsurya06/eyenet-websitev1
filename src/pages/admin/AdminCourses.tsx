"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminCourseFilter from '@/components/AdminCourseFilter';
import AdminCourseCard from '@/components/AdminCourseCard';
import AdminAddCourseDialog from '@/components/AdminAddCourseDialog'; // Import the modified dialog
import { useCourses } from '@/context/CourseContext';
import { Course } from '@/data/courses'; // Import Course interface

const AdminCourses = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const { courses, deleteCourse, addCourse, updateCourse } = useCourses();
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null); // State to hold the course being edited

  const filteredCourses = React.useMemo(() => {
    if (!categoryFilter) {
      return courses;
    }
    return courses.filter(course => course.category === categoryFilter);
  }, [categoryFilter, courses]);

  const handleAddCourseClick = () => {
    setEditingCourse(null); // Ensure we're in "add" mode
    setIsAddCourseDialogOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course); // Set the course to be edited
    setIsAddCourseDialogOpen(true);
  };

  const handleSaveCourse = (course: Course) => {
    if (editingCourse) {
      updateCourse(course); // Update existing course
    } else {
      addCourse(course); // Add new course
    }
    setIsAddCourseDialogOpen(false); // Close dialog after saving
    setEditingCourse(null); // Reset editing state
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Courses" />
      <AdminCourseFilter />
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Courses` : 'All Courses'}
          </h2>
        </AnimateOnScroll>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredCourses.map((course, index) => (
              <AnimateOnScroll key={course.id} delay={200 + index * 50}>
                <AdminCourseCard course={course} onDelete={deleteCourse} onEdit={handleEditCourse} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No courses found for this category.
            </p>
          </AnimateOnScroll>
        )}
      </div>

      <AdminAddCourseDialog
        open={isAddCourseDialogOpen}
        onOpenChange={setIsAddCourseDialogOpen}
        editingCourse={editingCourse}
        onSave={handleSaveCourse}
      />
    </div>
  );
};
export default AdminCourses;