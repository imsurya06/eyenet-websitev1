"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ImageGallerySection = () => {
  const images = [
    { src: '/images/img1.png', alt: 'Traditional attire model 1', span: 'row-span-2' }, // Large left image
    { src: '/images/img2.png', alt: 'Fashion show model 1' }, // Top middle
    { src: '/images/img3.png', alt: 'Traditional attire model 2', span: 'row-span-2' }, // Large right image
    { src: '/images/img4.png', alt: 'Fashion show model 2' }, // Bottom middle
    { src: '/images/img5.png', alt: 'Traditional attire model 3' }, // Bottom left
    { src: '/images/img6.png', alt: 'Traditional attire model 4' }, // Bottom right
    { src: '/images/img7.png', alt: 'Studio portrait model' }, // Far right
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-center">
      <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-foreground">
        Image Gallery
      </h2>
      <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-16">
        {/* Image 1: Large left image */}
        <div className="col-span-2 md:col-span-1 row-span-2 h-[400px] md:h-auto overflow-hidden rounded-lg shadow-md">
          <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 2: Top middle */}
        <div className="col-span-1 h-[192px] overflow-hidden rounded-lg shadow-md">
          <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 3: Large right image */}
        <div className="col-span-2 md:col-span-1 row-span-2 h-[400px] md:h-auto overflow-hidden rounded-lg shadow-md">
          <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 4: Bottom middle */}
        <div className="col-span-1 h-[192px] overflow-hidden rounded-lg shadow-md">
          <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 5: Bottom left */}
        <div className="col-span-1 h-[192px] overflow-hidden rounded-lg shadow-md">
          <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 6: Bottom right */}
        <div className="col-span-1 h-[192px] overflow-hidden rounded-lg shadow-md">
          <img src={images[5].src} alt={images[5].alt} className="w-full h-full object-cover" />
        </div>

        {/* Image 7: Far right (only visible on larger screens, or will wrap) */}
        <div className="col-span-2 md:col-span-1 h-[192px] overflow-hidden rounded-lg shadow-md">
          <img src={images[6].src} alt={images[6].alt} className="w-full h-full object-cover" />
        </div>
      </div>

      <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        <Link to="/gallery">View More</Link>
      </Button>
    </section>
  );
};

export default ImageGallerySection;