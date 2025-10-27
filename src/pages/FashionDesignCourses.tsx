"use client";

import React from 'react';
import FashionDesignImageGrid from '@/components/FashionDesignImageGrid';
import CallToActionSection from '@/components/CallToActionSection'; // Reusing existing CTA

const FashionDesignCourses = () => {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
          Fashion Design Courses
        </h1>
        <p className="text-text-medium font-body text-gray-600 max-w-2xl mx-auto">
          Unleash your creativity and master the art of fashion design with our comprehensive programs.
        </p>
      </section>
      <FashionDesignImageGrid />
      <CallToActionSection />
    </>
  );
};

export default FashionDesignCourses;