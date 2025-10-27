"use client";

import React from 'react';
import AboutHeroSection from '@/components/AboutHeroSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection'; // Import the WhyChooseUsSection

const About = () => {
  return (
    <>
      <AboutHeroSection />
      <WhyChooseUsSection /> {/* Add the WhyChooseUsSection here */}
    </>
  );
};

export default About;