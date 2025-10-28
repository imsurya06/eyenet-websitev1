"use client";

import React from 'react';
import FashionCoursesSection from '@/components/FashionCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const FashionDesignCourses = () => {
  return (
    <>
      <FashionCoursesSection />
      {/* Removed AdditionalFashionCoursesSection and MoreFashionCoursesSection to avoid repetition */}
      <CallToActionSection />
    </>
  );
};

export default FashionDesignCourses;