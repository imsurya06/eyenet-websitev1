"use client";

import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import BlogsDisplaySection from '@/components/BlogsDisplaySection';
import StudentWriteBlogSection from '@/components/StudentWriteBlogSection'; // Import the new component

const StudentsZone = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <AnimateOnScroll isHero={true} delay={500} className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">Students Zone</h1>
        <p className="text-text-medium font-body text-gray-600">
          Welcome to your hub for resources, news, and community updates!
        </p>
      </AnimateOnScroll>
      
      <BlogsDisplaySection />
      <StudentWriteBlogSection /> {/* Add the new section here */}
    </div>
  );
};

export default StudentsZone;