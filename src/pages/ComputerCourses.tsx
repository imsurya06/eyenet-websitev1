"use client";

import React from 'react';
import ComputerCoursesSection from '@/components/ComputerCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll
import LazyImage from '@/components/LazyImage'; // Import LazyImage

const ComputerCourses = () => {
  return (
    <>
      <ComputerCoursesSection />
      <CallToActionSection />
    </>
  );
};

export default ComputerCourses;