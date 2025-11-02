"use client";

import React from 'react';

const FashionDesignImageGrid = () => {
  const images = [
    { src: '/images/img1.png', alt: 'Fashion Design Image 1' },
    { src: '/images/img2.png', alt: 'Fashion Design Image 2' },
    { src: '/images/img3.png', alt: 'Fashion Design Image 3' },
    { src: '/images/img4.png', alt: 'Fashion Design Image 4' },
    { src: '/images/img5.png', alt: 'Fashion Design Image 5' },
    { src: '/images/img6.png', alt: 'Fashion Design Image 6' },
    { src: '/images/img7.png', alt: 'Fashion Design Image 7' },
    { src: '/images/img8.png', alt: 'Fashion Design Image 8' },
    { src: '/images/img9.png', alt: 'Fashion Design Image 9' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
          Fashion Design Gallery
        </h2>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          Explore the creative works from our fashion design students.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="w-full aspect-square overflow-hidden rounded-lg shadow-md drop-shadow-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionDesignImageGrid;