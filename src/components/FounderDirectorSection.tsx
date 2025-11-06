"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import LazyImage from './LazyImage'; // Import LazyImage

const FounderDirectorSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Section: Image */}
        <AnimateOnScroll delay={100} className="w-full h-[400px] md:h-[550px] overflow-hidden rounded-lg shadow-lg mx-auto lg:mx-0">
          <LazyImage
            src="/images/founder-director.png"
            alt="Founder & Director"
            className="w-full h-full object-cover"
          />
        </AnimateOnScroll>

        {/* Right Section: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll delay={200}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-6">
              Meet Our Founder <br /> & Director
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <p className="text-text-regular font-body text-gray-600 max-w-xl">
              Guided by the vision of our Founder and Director, Eyenet is
              committed to shaping students into confident and skilled
              professionals. We go beyond theory by offering hands-on
              training, industry-relevant courses, and practical projects that
              mirror real-world design challenges. Our teaching approach
              combines creativity, technology, and professional discipline,
              ensuring that every student not only masters tools like
              Photoshop and Illustrator but also develops the confidence to
              apply their skills in diverse industry settings. By fostering a
              supportive and inspiring learning environment, we prepare our
              students to excel in today's fast-paced and highly competitive
              design world.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default FounderDirectorSection;