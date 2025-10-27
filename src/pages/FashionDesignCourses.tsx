"use client";

import React from 'react';
import FashionCoursesSection from '@/components/FashionCoursesSection';
import AdditionalFashionCoursesSection from '@/components/AdditionalFashionCoursesSection';
import MoreFashionCoursesSection from '@/components/MoreFashionCoursesSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const FashionDesignCourses = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={200}>
        <FashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <AdditionalFashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <MoreFashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CallToActionSection />
      </AnimateOnScroll>
    </>
  );
};

export default FashionDesignCourses;