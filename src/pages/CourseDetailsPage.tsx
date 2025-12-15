"use client";

import React from 'react';
import { useParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { useCourses } from '@/context/CourseContext'; // Corrected import path

const CourseDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses } = useCourses(); // Use the hook to get courses
  const course = courses.find(c => c.id === slug); // Find course from the hook's state

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <AnimateOnScroll isHero={true} delay={500}>
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center">
            Course Not Found
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={600}>
          <p className="text-text-medium font-body text-gray-600 text-center">
            The course you are looking for does not exist.
          </p>
        </AnimateOnScroll>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <AnimateOnScroll isHero={true} delay={500}>
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center">
          {course.title}
        </h1>
      </AnimateOnScroll>
      <AnimateOnScroll isHero={true} delay={600}>
        <p className="text-text-medium font-body text-gray-600 text-center">
          Category: <span className="font-semibold text-primary">{course.category}</span>
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll isHero={true} delay={700}>
        <p className="text-text-regular font-body text-gray-500 mt-4 max-w-2xl text-center">
          {course.description.replace('Details...', '')}
        </p>
      </AnimateOnScroll>
      {course.image && (
        <AnimateOnScroll isHero={true} delay={800} className="mt-8 w-full max-w-xl rounded-lg overflow-hidden shadow-lg">
          <img src={course.image} alt={course.title} className="w-full h-auto object-cover" />
        </AnimateOnScroll>
      )}
    </div>
  );
};

export default CourseDetailsPage;