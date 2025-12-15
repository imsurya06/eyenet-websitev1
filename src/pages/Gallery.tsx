import React from 'react';
import GalleryCarouselSection from '@/components/GalleryCarouselSection';
import GalleryGridSection from '@/components/GalleryGridSection';
import CallToActionSection from '@/components/CallToActionSection';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Gallery = () => {
  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          {/* Title and Subtitle */}
          <AnimateOnScroll isHero={true} delay={100}> {/* Reduced delay */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center lg:text-left">
              Image Gallery
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}> {/* Reduced delay */}
            <p className="text-text-medium font-body text-gray-600 mb-16 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              Here some of our works are displayed.
            </p>
          </AnimateOnScroll>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Left Column - Contains the tall image and one regular image */}
            <div className="flex flex-col gap-6">
              <AnimateOnScroll isHero={true} delay={300}> {/* Reduced delay */}
                <div className="w-full h-[400px] md:h-[550px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img1.png" alt="Traditional attire model 1" className="w-full h-full object-cover" />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll isHero={true} delay={400}> {/* Reduced delay */}
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img4.png" alt="Fashion show model 2" className="w-full h-full object-cover" />
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Column - Contains two regular images stacked */}
            <div className="flex flex-col gap-6">
              <AnimateOnScroll isHero={true} delay={500}> {/* Reduced delay */}
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img2.png" alt="Fashion show model 1" className="w-full h-full object-cover" />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll isHero={true} delay={600}> {/* Reduced delay */}
                <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-md">
                  <img src="/images/img3.png" alt="Traditional attire model 2" className="w-full h-full object-cover" />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
      <GalleryCarouselSection />
      <GalleryGridSection />
      <CallToActionSection />
    </>
  );
};

export default Gallery;