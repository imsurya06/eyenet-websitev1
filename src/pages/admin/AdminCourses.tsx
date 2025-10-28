"use client";
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AdminHeader from '@/components/AdminHeader';
import AdminCourseFilter from '@/components/AdminCourseFilter';
import AdminCourseCard from '@/components/AdminCourseCard'; // Import the new AdminCourseCard
import { allCourses, Course } from '@/data/courses'; // Import allCourses data

const AdminCourses = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredCourses = React.useMemo(() => {
    if (!categoryFilter) {
      return allCourses;
    }
    return allCourses.filter(course => course.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader pageTitle="Courses" />
      <AdminCourseFilter />
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-gray-50"> {/* Added padding and background */}
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 text-foreground text-center">
            {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Courses` : 'All Courses'}
          </h2>
        </AnimateOnScroll>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredCourses.map((course, index) => (
              <AnimateOnScroll key={course.id} delay={200 + index * 50}>
                <AdminCourseCard course={course} />
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
    </div>
  );
};
export default AdminCourses;