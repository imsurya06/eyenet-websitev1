import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhyChooseUsSection from '@/components/WhyChooseUsSection'; // This is the About page's section
import HomeWhyChooseUsSection from '@/components/HomeWhyChooseUsSection'; // Import the new home page section
import OurProgramsSection from '@/components/OurProgramsSection';
import ImpactByNumbersSection from '@/components/ImpactByNumbersSection';
import StudentStoriesSection from '@/components/StudentStoriesSection';
import CallToActionSection from '@/components/CallToActionSection';
// Removed import for NewsletterSection
import FAQSection from '@/components/FAQSection';
import LocationSection from '@/components/LocationSection'; // Import the new component
// Removed ImageGallerySection from here
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import the new component

const Index = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={500}> {/* Apply hero animation */}
        <div className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center justify-center px-3 py-12 md:px-8 lg:px-[80px] bg-background md:py-16 lg:py-24">
          {/* Mobile Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{ backgroundImage: 'url(/images/hero-model.png)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for readability */}
          </div>

          {/* Left Section: Text Content */}
          <div className="relative z-10 text-center md:text-left max-w-2xl md:mr-12 md:mb-0 md:flex-1"> {/* Changed flex-1 to md:flex-1 */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-white md:text-foreground">
              Design your future with creative excellence
            </h1>
            <p className="text-text-medium font-body mb-8 text-white md:text-gray-600">
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
          </div>

          {/* Right Section: Image (Desktop Only) */}
          <div className="hidden md:flex flex-1 justify-center md:justify-end relative z-10">
            <img
              src="/images/hero-model.png"
              alt="Fashion model illustration"
              className="max-w-full h-auto md:max-w-md lg:max-w-lg object-cover"
            />
          </div>
        </div>
      </AnimateOnScroll>

      {/* Why Choose Us Section (Home Page Specific) */}
      <AnimateOnScroll delay={200}>
        <HomeWhyChooseUsSection />
      </AnimateOnScroll>

      {/* Our Programs Section */}
      <AnimateOnScroll delay={200}>
        <OurProgramsSection />
      </AnimateOnScroll>

      {/* Impact By Numbers Section */}
      <AnimateOnScroll delay={200}>
        <ImpactByNumbersSection />
      </AnimateOnScroll>

      {/* Student Stories Section */}
      <AnimateOnScroll delay={200}>
        <StudentStoriesSection />
      </AnimateOnScroll>

      {/* Call To Action Section */}
      <AnimateOnScroll delay={200}>
        <CallToActionSection />
      </AnimateOnScroll>

      {/* FAQ Section */}
      <AnimateOnScroll delay={200}>
        <FAQSection />
      </AnimateOnScroll>

      {/* Location Section */}
      <AnimateOnScroll delay={200}>
        <LocationSection />
      </AnimateOnScroll>
    </>
  );
};

export default Index;