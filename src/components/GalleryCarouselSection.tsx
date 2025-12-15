"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"; // Using Card for consistent styling
import Autoplay from "embla-carousel-autoplay"; // Import Autoplay plugin
import AnimateOnScroll from './AnimateOnScroll';

const GalleryCarouselSection = () => {
  const carouselImages = [
    { src: '/images/img1.png', alt: 'South Indian Designer Concert 1' },
    { src: '/images/img2.png', alt: 'South Indian Designer Concert 2' },
    { src: '/images/img3.png', alt: 'South Indian Designer Concert 3' },
    { src: '/images/img4.png', alt: 'South Indian Designer Concert 4' },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // Autoplay every 3 seconds, don't stop on user interaction
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto"> {/* This container now holds both text and carousel */}
        {/* Text Content - now above the carousel */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-8">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
              South Indian Designer <br /> Concert
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 max-w-md">
              Our Students participated and won first prize
            </p>
          </AnimateOnScroll>
        </div>

        {/* Carousel - now full width within max-w-7xl */}
        <AnimateOnScroll delay={300} className="w-full">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              loop: true, // Enable looping
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none shadow-lg">
                      <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default GalleryCarouselSection;