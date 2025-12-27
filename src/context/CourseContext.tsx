"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Course } from '@/data/courses'; // Keep Course interface, but initialCourses is no longer imported
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
        // Removed fallback to initialCourses. If Supabase fails, courses will remain empty.
      } else {
        setCourses(data as Course[]);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const addCourse = async (course: Course) => {
    // Omit the 'icon' property before sending to Supabase
    const { icon, ...coursePayload } = course;
    // Ensure the ID is unique for Supabase
    const courseToInsert = { ...coursePayload, id: course.id || `course-${Date.now()}` };

    const { data, error } = await supabase
      .from('courses')
      .insert([courseToInsert])
      .select(); // Select the inserted data to get any default values/timestamps

    if (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course.');
    } else if (data && data.length > 0) {
      setCourses(prevCourses => [...prevCourses, data[0] as Course]); // Cast back to Course for local state
      toast.success('Course added successfully!');
    }
  };

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

  const updateCourse = async (updatedCourse: Course) => {
    // Omit 'icon' property before sending to Supabase. 'created_at' is not part of the Course interface.
    const { icon, ...coursePayload } = updatedCourse;
    const { data, error } = await supabase
      .from('courses')
      .update(coursePayload) // Send payload without icon
      .eq('id', updatedCourse.id)
      .select(); // Select the updated data

    if (error) {
      console.error('Error updating course:', error);
      // Display the specific error message from Supabase
      toast.error(`Failed to update course: ${error.message}`);
    } else if (data && data.length > 0) {
      setCourses(prevCourses =>
        prevCourses.map(course => (course.id === updatedCourse.id ? data[0] as Course : course))
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