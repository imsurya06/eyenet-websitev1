"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const InfrastructureImageGridSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
            More Campus Views
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover more of our inspiring learning spaces and facilities.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column - Contains two regular images stacked */}
          <div className="flex flex-col gap-6">
            <AnimateOnScroll delay={300}>
              <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                <img src="/images/pexels-pixabay-256491.jpg" alt="Computer Lab" className="w-full h-full object-cover object-center" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={400}>
              <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                <img src="/images/pexels-tima-miroshnichenko-6550407.jpg" alt="Classroom" className="w-full h-full object-cover object-center" />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Column - Contains one tall image */}
          <AnimateOnScroll delay={500} className="w-full h-[524px] overflow-hidden rounded-lg shadow-md"> {/* Adjusted height to match stacked images + gap */}
            <img src="/images/pexels-pixabay-356065.jpg" alt="Library" className="w-full h-full object-cover object-center" />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureImageGridSection;