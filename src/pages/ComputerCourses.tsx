"use client";

import React from 'react';
import ComputerCoursesSection from '@/components/ComputerCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const ComputerCourses = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={500}>
        <ComputerCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <CallToActionSection />
      </AnimateOnScroll>
    </>
  );
};

export default ComputerCourses;