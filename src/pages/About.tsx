"use client";

import React from 'react';
import AboutHeroSection from '@/components/AboutHeroSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FounderDirectorSection from '@/components/FounderDirectorSection';
import ImageGallerySection from '@/components/ImageGallerySection'; // Import the ImageGallerySection

const About = () => {
  return (
    <>
      <AboutHeroSection />
      <WhyChooseUsSection />
      <FounderDirectorSection />
      <ImageGallerySection /> {/* Add the ImageGallerySection here */}
    </>
  );
};

export default About;