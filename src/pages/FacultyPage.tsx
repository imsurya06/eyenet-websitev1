"use client";

import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import FacultySection from '@/components/FacultySection'; // Reusing the existing FacultySection

const FacultyPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <AnimateOnScroll isHero={true} delay={500} className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">Our Faculty</h1>
        <p className="text-text-medium font-body text-gray-600">
          Meet the experienced educators and industry experts guiding our students.
        </p>
      </AnimateOnScroll>
      <FacultySection />
    </div>
  );
};

export default FacultyPage;