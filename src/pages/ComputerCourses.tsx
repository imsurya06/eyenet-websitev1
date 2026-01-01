"use client";

import React from 'react';
import ComputerCoursesSection from '@/components/ComputerCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll
import NCFTLogo from '@/components/NCFTLogo'; // Import NCFTLogo

const ComputerCourses = () => {
  return (
    <>
      <NCFTLogo /> {/* Added NCFTLogo here */}
      <ComputerCoursesSection />
      <CallToActionSection />
    </>
  );
};

export default ComputerCourses;