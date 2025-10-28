"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { initialCourses, Course } from '@/data/courses';

interface CourseContextType {
  courses: Course[];
  deleteCourse: (id: string) => void;
  addCourse: (course: Course) => void; // Added addCourse function
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const deleteCourse = (id: string) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
  };

  const addCourse = (course: Course) => {
    setCourses(prevCourses => [...prevCourses, course]);
  };

  return (
    <CourseContext.Provider value={{ courses, deleteCourse, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};