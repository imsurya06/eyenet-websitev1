import React from 'react';
import GalleryCarouselSection from '@/components/GalleryCarouselSection';
import GalleryGridSection from '@/components/GalleryGridSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Gallery = () => {
  return (
    <>
      <AnimateOnScroll isHero={true} delay={200}> {/* Apply hero animation to the first section */}
        <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
          <div className="max-w-7xl mx-auto">
            {/* Title and Subtitle */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center lg:text-left">
              Image Gallery
            </h1>
            <p className="text-text-medium font-body text-gray-600 mb-16 text-center lg:text-left">
              Here some of our works are displayed.
            </p>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Left Column - Contains the tall image and one regular image */}
              <div className="flex flex-col gap-6">
                <div className="w-full h-[400px] md:h-[550px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img1.png" alt="Traditional attire model 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img4.png" alt="Fashion show model 2" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Right Column - Contains two regular images stacked */}
              <div className="flex flex-col gap-6">
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img2.png" alt="Fashion show model 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img3.png" alt="Traditional attire model 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <GalleryCarouselSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <GalleryGridSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CallToActionSection />
      </AnimateOnScroll>
    </>
  );
};

export default Gallery;