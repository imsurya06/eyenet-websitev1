import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import HomeWhyChooseUsSection from '@/components/HomeWhyChooseUsSection';
import OurProgramsSection from '@/components/OurProgramsSection';
import ImpactByNumbersSection from '@/components/ImpactByNumbersSection';
import StudentStoriesSection from '@/components/StudentStoriesSection';
import CallToActionSection from '@/components/CallToActionSection';
import FAQSection from '@/components/FAQSection';
import LocationSection from '@/components/LocationSection';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import CollaborationsSection from '@/components/CollaborationsSection';

const Index = () => {
  return (
    <>
      <div className="relative flex flex-col md:flex-row items-center justify-center px-3 md:px-8 lg:px-[80px] bg-background min-h-screen pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20 md:gap-x-12">
        {/* Mobile Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: 'url(/images/hero-model.png)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Left Section: Text Content */}
        <AnimateOnScroll isHero={true} delay={100} className="relative z-10 text-center md:text-left max-w-2xl md:w-1/2 md:mb-0">
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-white md:text-foreground">
            Design your <br className="hidden md:block" /> future with creative excellence
          </h1>
          <p className="text-text-regular md:text-text-large font-body mb-8 text-white md:text-gray-600">
            Transform your passion into a professional career. Our institute offers
            comprehensive design education that bridges creativity with industry
            expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild className="px-6 py-3 text-text-regular text-white">
              <Link to="/courses">Explore courses</Link>
            </Button>
            <Button variant="outline" asChild className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">Request info</Link>
            </Button>
          </div>
        </AnimateOnScroll>

        {/* Right Section: Image (Desktop Only) */}
        <AnimateOnScroll isHero={true} delay={200} className="hidden md:flex md:w-1/2 h-full justify-end items-end relative z-10">
          <img
            src="/images/hero-model.png"
            alt="Fashion model illustration"
            className="max-h-[80vh] w-auto object-contain object-right rounded-lg animate-float"
          />
        </AnimateOnScroll>
      </div>

      {/* Our Programs Section - Moved here */}
      <OurProgramsSection />

      {/* Collaborations Section */}
      <CollaborationsSection />

      {/* Why Choose Us Section (Home Page Specific) */}
      <HomeWhyChooseUsSection />

      {/* Impact By Numbers Section */}
      <ImpactByNumbersSection />

      {/* Student Stories Section */}
      <StudentStoriesSection />

      {/* Call To Action Section */}
      <CallToActionSection />

      {/* FAQ Section */}
      <FAQSection id="faq-section" />

      {/* Location Section */}
      <LocationSection />
    </>
  );
};

export default Index;