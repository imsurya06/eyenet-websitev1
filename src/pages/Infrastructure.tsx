"use client";

import React from 'react';
import InfrastructureHeroSection from '@/components/InfrastructureHeroSection';
import InfrastructureGridSection from '@/components/InfrastructureGridSection';
import FacultySection from '@/components/FacultySection'; // Import FacultySection
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Infrastructure = () => {
  return (
    <>
      <InfrastructureHeroSection />
      <InfrastructureGridSection />
      {/* Removed InfrastructureImageGridSection as it was a duplicate */}
      <FacultySection /> {/* Add the new FacultySection here */}
    </>
  );
};

export default Infrastructure;