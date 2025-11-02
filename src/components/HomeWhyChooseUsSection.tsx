"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const HomeWhyChooseUsSection = () => {
  const features = [
    {
      image: '/images/faculty.png',
      title: 'Experienced faculty',
      description: 'Industry veterans with real-world design expertise guide our students.',
    },
    {
      image: '/images/facilities.png',
      title: 'State-of-the-art facilities',
      description: 'Modern studios and advanced technology support innovative learning.',
    },
    {
      image: '/images/partnerships.png',
      title: 'Industry partnerships',
      description: 'Direct connections with leading design firms create unique opportunities.',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-center">
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-gray-600 mb-4">Why choose us</p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 max-w-3xl mx-auto">
          Exceptional design education for creative professionals
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          We provide a transformative learning experience that prepares students for dynamic creative careers.
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <AnimateOnScroll key={index} delay={200 + index * 75}> {/* Reduced delay increment */}
            <div className="flex flex-col items-center">
              <div className="w-full h-48 md:h-64 overflow-hidden rounded-lg mb-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2">
                {feature.title}
              </h3>
              <p className="text-text-regular font-body text-gray-600 max-w-xs">
                {feature.description}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll delay={100}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/about">Learn more</Link>
          </Button>
          <Button asChild variant="ghost" className="px-6 py-3 text-text-regular text-primary hover:bg-transparent hover:text-primary/80">
            <Link to="/contact">
              Contact us <ArrowRight className="ml-2 h-4 w-4 inline-block" />
            </Link>
          </Button>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default HomeWhyChooseUsSection;