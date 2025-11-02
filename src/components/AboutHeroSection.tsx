"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const AboutHeroSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Main Title and Subtitle - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <AnimateOnScroll isHero={true} delay={100}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading text-foreground leading-tight mb-4">
              Eyenet: A Creative Educational Academy
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}>
            <p className="text-text-large font-body text-gray-600 max-w-3xl mx-auto">
              Where Creativity Creates Career.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Main Hero Image */}
        <AnimateOnScroll isHero={true} delay={300} className="w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg mb-12 md:mb-16 lg:mb-20">
          <img
            src="/images/about-image-1.png"
            alt="Fashion model in traditional attire"
            className="w-full h-full object-cover object-top" // Added object-top here
          />
        </AnimateOnScroll>

        {/* Text Content with Side Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Section: Detailed Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimateOnScroll delay={400}>
              <h2 className="text-h3-mobile md:text-h3-desktop font-heading mb-6">
                Shaping Confident & Skilled Designers
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={500}>
              <p className="text-text-regular font-body text-gray-600 mb-6">
                For over 25 years, Eyenet Institute has been a beacon for creative minds,
                providing unparalleled training in fashion design, graphic design, and
                mastery of modern tools like Photoshop and Illustrator. Our commitment
                is to bridge creativity with industry expertise, transforming passion
                into a professional career.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={600}>
              <p className="text-text-regular font-body text-gray-600">
                Guided by our Founder and Director's vision, we shape students into
                confident and skilled professionals through hands-on training,
                industry-relevant courses, and practical projects that mirror real-world
                design challenges. Our teaching approach integrates creativity,
                technology, and professional discipline, ensuring every student
                develops the confidence to excel in today's fast-paced and highly
                competitive design world.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Right Section: Secondary Image */}
          <AnimateOnScroll delay={700} className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-lg shadow-lg mx-auto lg:mx-0">
            <img
              src="/images/about-image-2.png"
              alt="Fashion model in light green attire"
              className="w-full h-full object-cover object-top" // Added object-top here
            />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;