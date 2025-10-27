"use client";

import React from 'react';
import AboutHeroSection from '@/components/AboutHeroSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FounderDirectorSection from '@/components/FounderDirectorSection';
import ImageGallerySection from '@/components/ImageGallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LocationSection from '@/components/LocationSection';
import ContactUsSection from '@/components/ContactUsSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const About = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={200}>
        <AboutHeroSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <WhyChooseUsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FounderDirectorSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ImageGallerySection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <TestimonialsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <LocationSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ContactUsSection />
      </AnimateOnScroll>
    </>
  );
};

export default About;