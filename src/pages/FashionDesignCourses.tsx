"use client";

import React from 'react';
import FashionCoursesSection from '@/components/FashionCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll
import NCFTLogo from '@/components/NCFTLogo'; // Import NCFTLogo

const FashionDesignCourses = () => {
  return (
    <>
      <NCFTLogo /> {/* Added NCFTLogo here */}
      <FashionCoursesSection />
      {/* Removed AdditionalFashionCoursesSection and MoreFashionCoursesSection to avoid repetition */}
      <CallToActionSection />
    </>
  );
};

export default FashionDesignCourses;