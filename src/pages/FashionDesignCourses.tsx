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
      <AnimateOnScroll isHero={true} delay={500}>
        <FashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <AdditionalFashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <MoreFashionCoursesSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <CallToActionSection />
      </AnimateOnScroll>
    </>
  );
};

export default FashionDesignCourses;