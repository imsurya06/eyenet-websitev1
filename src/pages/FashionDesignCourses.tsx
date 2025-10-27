"use client";

import React from 'react';
import FashionCoursesSection from '@/components/FashionCoursesSection'; // Import the new component
import CallToActionSection from '@/components/CallToActionSection'; // Reusing existing CTA

const FashionDesignCourses = () => {
  return (
    <>
      <FashionCoursesSection /> {/* Add the new course cards section here */}
      <CallToActionSection />
    </>
  );
};

export default FashionDesignCourses;