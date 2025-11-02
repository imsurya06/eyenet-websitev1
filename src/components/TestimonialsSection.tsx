"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Mia", // Placeholder avatar
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Leo", // Placeholder avatar
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Chloe", // Placeholder avatar
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Noah", // Placeholder avatar
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Lily", // Placeholder avatar
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
      name: "Name Surname",
      position: "Position, Company name",
      avatar: "https://api.dicebear.com/8.x/adventurer/svg?seed=Jack", // Placeholder avatar
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Left Section: Title, Description, Buttons */}
        <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
              testimonials
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-8 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/admissions">Apply</Link>
              </Button>
              <Button asChild variant="ghost" className="px-6 py-3 text-text-regular text-primary hover:bg-transparent hover:text-primary/80">
                <Link to="/contact">
                  Get info <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right Section: Testimonial Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={index} delay={400 + index * 100}>
              <div className="bg-muted p-6 rounded-lg shadow-sm flex flex-col justify-between items-center text-center md:items-start md:text-left"> {/* Added items-center and text-center for mobile */}
                <div className="mb-4">
                  <div className="flex items-center mb-3 justify-center md:justify-start"> {/* Added justify-center for mobile */}
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-text-regular font-body text-foreground italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center mt-4"> {/* Adjusted for mobile centering */}
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mb-2 md:mb-0 md:mr-3 object-cover"
                  />
                  <div>
                    <p className="text-text-medium font-body font-semibold text-foreground leading-none">
                      {testimonial.name}
                    </p>
                    <p className="text-text-small font-body text-gray-600 leading-none">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;