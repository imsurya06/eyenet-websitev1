"use client";

import React from 'react';
import ComputerCoursesSection from '@/components/ComputerCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const ComputerCourses = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={200}>
        <ComputerCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CallToActionSection />
      </AnimateOnScroll>
    </>
  );
};

export default ComputerCourses;