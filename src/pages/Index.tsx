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
      <div className="relative min-h-[calc(100vh-6rem)] flex flex-col md:flex-row items-center justify-center px-3 py-12 md:px-8 lg:px-[80px] bg-background md:py-16 lg:py-24">
        {/* Mobile Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: 'url(/images/hero-model.png)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Overlay for readability */}
        </div>

        {/* Left Section: Text Content */}
        <AnimateOnScroll isHero={true} delay={100} className="relative z-10 text-center md:text-left max-w-2xl md:mr-12 md:mb-0 md:flex-1"> {/* Changed flex-1 to md:flex-1 */}
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-white md:text-foreground">
            Design your <br className="hidden md:block" /> future with creative excellence
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
        </AnimateOnScroll>

        {/* Right Section: Image (Desktop Only) */}
        <AnimateOnScroll isHero={true} delay={200} className="hidden md:flex flex-1 justify-center md:justify-end relative z-10">
          <img
            src="/images/hero-model.png"
            alt="Fashion model illustration"
            className="max-w-full h-auto md:max-w-md lg:max-w-lg object-cover object-top rounded-lg shadow-2xl animate-float" // Added object-top
          />
        </AnimateOnScroll>
      </div>

      {/* Why Choose Us Section (Home Page Specific) */}
      <HomeWhyChooseUsSection />

      {/* Our Programs Section */}
      <OurProgramsSection />

      {/* Impact By Numbers Section */}
      <ImpactByNumbersSection />

      {/* Student Stories Section */}
      <StudentStoriesSection />

      {/* Call To Action Section */}
      <CallToActionSection />

      {/* FAQ Section */}
      <FAQSection id="faq-section" /> {/* Added id here */}

      {/* Location Section */}
      <LocationSection />
    </>
  );
};

export default Index;