"use client";

import React from 'react';

const InfrastructureGridSection = () => {
  const gridImages = [
    { src: '/public/placeholder.svg', alt: 'Infrastructure Image 1' },
    { src: '/public/placeholder.svg', alt: 'Infrastructure Image 2' },
    { src: '/public/placeholder.svg', alt: 'Infrastructure Image 3' },
    { src: '/public/placeholder.svg', alt: 'Infrastructure Image 4' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
          Our Facilities
        </h2>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          A glimpse into our modern and inspiring learning environment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridImages.map((image, index) => (
            <div key={index} className="w-full aspect-square overflow-hidden rounded-lg shadow-md">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureGridSection;