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

const InfrastructureHeroSection = () => {
  const infrastructureImages = [
    { src: '/images/pexels-pixabay-256491.jpg', alt: 'Computer Lab' },
    { src: '/images/pexels-tima-miroshnichenko-6550407.jpg', alt: 'Classroom' },
    { src: '/images/pexels-meruyert-gonullu-7317589.jpg', alt: 'Lecture Hall' },
    { src: '/images/pexels-george-pak-7972494.jpg', alt: 'Students studying outdoors' },
    { src: '/images/pexels-yankrukov-8197513.jpg', alt: 'Professor in lecture hall' },
    { src: '/images/pexels-rdne-8499580.jpg', alt: 'Campus Building' },
    { src: '/images/pexels-pixabay-356065.jpg', alt: 'Library' },
    { src: '/images/pexels-gabriel-manjarres-119584478-19064143.jpg', alt: 'Student in classroom' },
    { src: '/images/pexels-pixabay-256395.jpg', alt: 'Empty classroom' },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll isHero={true} delay={100}> {/* Reduced delay */}
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
            Infrastructure
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={200}> {/* Reduced delay */}
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            We have well enough infrastructure to enhance the life of students.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll isHero={true} delay={300} className="w-full"> {/* Reduced delay */}
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {infrastructureImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none shadow-lg">
                      <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover object-center"
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

export default InfrastructureHeroSection;