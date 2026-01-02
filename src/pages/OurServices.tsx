"use client";

import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import CallToActionSection from '@/components/CallToActionSection';
import { Briefcase, Camera, Mic, Sparkles, Monitor } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Multimedia Training',
    description: 'Comprehensive training in video editing, animation, and digital content creation.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Master the art of photography, from basic techniques to advanced studio setups.',
  },
  {
    icon: Mic,
    title: 'Spoken English',
    description: 'Improve your communication skills with our interactive spoken English courses.',
  },
  {
    icon: Sparkles,
    title: 'Beautician Course',
    description: 'Learn professional beauty techniques, makeup artistry, and salon management.',
  },
];

const OurServices = () => {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
        <AnimateOnScroll isHero={true} delay={100}>
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
            Our Services
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            Beyond our core courses, we offer specialized training and services to enhance your skills.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <AnimateOnScroll key={index} delay={300 + index * 100}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md drop-shadow-lg border border-gray-200 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-text-regular font-body text-gray-600">
                  {service.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
      <CallToActionSection />
    </>
  );
};

export default OurServices;