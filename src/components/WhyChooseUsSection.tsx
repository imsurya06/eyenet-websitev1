"use client";

import React from 'react';

const WhyChooseUsSection = () => {
  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '85%', label: 'Student Satisfaction' },
    { value: '90%', label: 'Industry Recognition' },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-[80px] bg-background text-center">
      <p className="text-text-regular font-body text-primary mb-12">Why Choose Us?</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center px-8">
              <p className="text-h2-mobile md:text-h2-desktop font-heading text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-text-medium font-body text-gray-600">
                {stat.label}
              </p>
            </div>
            {index < stats.length - 1 && (
              <div className="hidden md:block h-24 w-px bg-gray-300">{/* Vertical separator for desktop */}</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;