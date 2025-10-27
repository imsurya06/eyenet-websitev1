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
      <AnimateOnScroll isHero={true} delay={500}>
        <AboutHeroSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <WhyChooseUsSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <FounderDirectorSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <ImageGallerySection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <TestimonialsSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <LocationSection />
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <ContactUsSection />
      </AnimateOnScroll>
    </>
  );
};

export default About;