"use client";

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import AnimateOnScroll from './AnimateOnScroll';
import { useGalleryImages } from '@/context/GalleryImageContext'; // Import useGalleryImages

const DynamicGalleryCarouselSection = () => {
  const { galleryImages, loading } = useGalleryImages(); // Use the context to get images

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Filter out images that are already used in the static GalleryCarouselSection if needed,
  // or just display all dynamic images. For now, we'll display all from context.
  const imagesToDisplay = galleryImages;

  if (loading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <AnimateOnScroll delay={100}>
          <p className="text-text-medium font-body text-gray-600">Loading gallery images...</p>
        </AnimateOnScroll>
      </section>
    );
  }

  if (imagesToDisplay.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
            Our Gallery
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            No gallery images to display at the moment.
          </p>
        </AnimateOnScroll>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-8">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
              Our Creative Works
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 max-w-md">
              A collection of projects, events, and campus highlights.
            </p>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={300} className="w-full">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {imagesToDisplay.map((image, index) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <Card className="border-none shadow-lg">
                      <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover object-top"
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

export default DynamicGalleryCarouselSection;