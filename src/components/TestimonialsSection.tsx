"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';
import { useTestimonials } from '@/context/TestimonialContext'; // Import useTestimonials

const TestimonialsSection = () => {
  const { testimonials, loading } = useTestimonials(); // Use the context
  const approvedTestimonials = testimonials.filter(t => t.approved); // Filter for approved testimonials

  // Removed hardcoded testimonials array

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
              Hear from our talented design graduates and current students.
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
          {loading ? (
            <AnimateOnScroll delay={400} className="col-span-full text-center text-text-medium text-gray-600">
              Loading testimonials...
            </AnimateOnScroll>
          ) : approvedTestimonials.length > 0 ? (
            approvedTestimonials.map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id} delay={400 + index * 100}>
                <div className="bg-muted p-6 rounded-lg shadow-sm flex flex-col justify-between items-center text-center md:items-start md:text-left">
                  <div className="mb-4">
                    <div className="flex items-center mb-3 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${testimonial.rating > i ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-text-regular font-body text-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:flex-row md:items-center mt-4">
                    {/* Placeholder avatar - you might want to add an avatar field to your testimonial data */}
                    <img
                      src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${testimonial.name}`}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full mb-2 md:mb-0 md:mr-3 object-cover"
                    />
                    <div>
                      <p className="text-text-medium font-body font-semibold text-foreground leading-none">
                        {testimonial.name}
                      </p>
                      <p className="text-text-small font-body text-gray-600 leading-none">
                        Student
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))
          ) : (
            <AnimateOnScroll delay={400} className="col-span-full text-center text-text-medium text-gray-600">
              No approved testimonials to display yet.
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;