"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const InfrastructureGridSection = () => {
  const gridImages = [
    { src: '/images/pexels-pixabay-256491.jpg', alt: 'Computer Lab' },
    { src: '/images/pexels-tima-miroshnichenko-6550407.jpg', alt: 'Classroom' },
    { src: '/images/pexels-pixabay-356065.jpg', alt: 'Library' },
    { src: '/images/pexels-gabriel-manjarres-119584478-19064143.jpg', alt: 'Student in classroom' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
            Our Facilities
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            A glimpse into our modern and inspiring learning environment.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridImages.map((image, index) => (
            <AnimateOnScroll key={index} delay={300 + index * 100}>
              <div className="w-full aspect-square overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureGridSection;