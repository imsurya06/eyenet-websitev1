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
    <section className="py-16 md:py-20 lg:py-24 px-3 md:px-8 lg:px-[80px] bg-background text-center"> {/* Increased vertical padding */}
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-primary mb-16">Why Choose Us?</p> {/* Increased bottom margin */}
      </AnimateOnScroll>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 max-w-6xl mx-auto"> {/* Increased max-width */}
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <AnimateOnScroll delay={200 + index * 100}>
              <div className="flex flex-col items-center px-8">
                <p className="text-h2-mobile md:text-h2-desktop font-heading text-foreground mb-2">
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