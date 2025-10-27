"use client";

import React from 'react';
import { useParams } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const CourseDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <AnimateOnScroll isHero={true} delay={500}> {/* Apply hero animation */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center">
          Course Details
        </h1>
        <p className="text-text-medium font-body text-gray-600 text-center">
          Details for: <span className="font-semibold text-primary">{slug?.replace(/-/g, ' ')}</span>
        </p>
        <p className="text-text-regular font-body text-gray-500 mt-4">
          This page will be designed later to show specific course information.
        </p>
      </div>
    </AnimateOnScroll>
  );
};

export default CourseDetailsPage;