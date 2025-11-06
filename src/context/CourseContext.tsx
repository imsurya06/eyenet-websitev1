"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { initialCourses, Course } from '@/data/courses';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
import { toast } from 'sonner'; // Import toast for notifications

interface CourseContextType {
  courses: Course[];
  deleteCourse: (id: string) => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (updatedCourse: Course) => Promise<void>;
  loading: boolean; // Add loading state
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Supabase on initial load
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title', { ascending: true }); // Order by title for consistent display

      if (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses.');
        setCourses(initialCourses); // Fallback to initial data if Supabase fails
      } else {
        setCourses(data as Course[]);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const deleteCourse = async (id: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course.');
    } else {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      toast.success('Course deleted successfully!');
    }
  };

  const addCourse = async (course: Course) => {
    // Ensure the ID is unique for Supabase
    const courseToInsert = { ...course, id: course.id || `course-${Date.now()}` };
    const { data, error } = await supabase
      .from('courses')
      .insert([courseToInsert])
      .select(); // Select the inserted data to get any default values/timestamps

    if (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course.');
    } else if (data && data.length > 0) {
      setCourses(prevCourses => [...prevCourses, data[0]]);
      toast.success('Course added successfully!');
    }
  };

  const updateCourse = async (updatedCourse: Course) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updatedCourse)
      .eq('id', updatedCourse.id)
      .select(); // Select the updated data

    if (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course.');
    } else if (data && data.length > 0) {
      setCourses(prevCourses =>
        prevCourses.map(course => (course.id === updatedCourse.id ? data[0] : course))
      );
      toast.success('Course updated successfully!');
    }
  };

  return (
    <CourseContext.Provider value={{ courses, deleteCourse, addCourse, updateCourse, loading }}>
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