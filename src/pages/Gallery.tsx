"use client";

import React from 'react';
import GalleryCarouselSection from '@/components/GalleryCarouselSection';
import DynamicGalleryCarouselSection from '@/components/DynamicGalleryCarouselSection'; // Import the new component
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const Gallery = () => {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
        <div className="max-w-7xl mx-auto text-center lg:text-left">
          {/* Title and Subtitle */}
          <AnimateOnScroll isHero={true} delay={100}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center lg:text-left">
              Image Gallery
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-16 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              Here some of our works are displayed.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
      <GalleryCarouselSection /> {/* This section remains for specific hardcoded concert images */}
      <DynamicGalleryCarouselSection /> {/* This replaces the old GalleryGridSection */}
      <CallToActionSection />
    </>
  );
};

export default Gallery;