"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const WhyChooseUsSection = () => {
  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '85%', label: 'Student Satisfaction' },
    { value: '90%', label: 'Industry Recognition' },
  ];

  return (
    <section className="py-20 md:py-24 lg:py-32 px-3 md:px-8 lg:px-[80px] bg-background text-center"> {/* Increased vertical padding */}
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-primary mb-16">Why Choose Us?</p>
      </AnimateOnScroll>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 max-w-7xl mx-auto"> {/* Increased max-width and gap */}
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <AnimateOnScroll delay={200 + index * 100}>
              <div className="flex flex-col items-center px-8">
                <p className="text-h1-mobile md:text-h1-desktop font-heading text-foreground mb-2"> {/* Increased font size for values */}
                  {stat.value}
                </p>
                <p className="text-text-medium font-body text-gray-600">
                  {stat.label}
                </p>
              </div>
            </AnimateOnScroll>
            {index < stats.length - 1 && (
              <AnimateOnScroll delay={250 + index * 100} className="hidden md:block">
                <div className="h-24 w-px bg-gray-300">{/* Vertical separator for desktop */}</div>
              </AnimateOnScroll>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;