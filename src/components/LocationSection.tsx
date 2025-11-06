import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from './AnimateOnScroll';
import LazyImage from './LazyImage'; // Import LazyImage

const LocationSection = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir//Suguna+store,+Hamdhiya+towers+2nd+floor,+80+feet+road,+Jn,+Anna+Nagar,+Madurai,+Tamil+Nadu+625020/@9.9291093,78.1409982,15.78z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b00c5072a46551f:0x3feb0d2a94af46bb!2m2!1d78.1485275!2d9.9215582?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-center lg:text-left">
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-gray-600 mb-4">Our location</p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-16 max-w-3xl mx-auto lg:mx-0">
          We are Madurai based institute
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Left Section: Address Card */}
        <AnimateOnScroll delay={300} className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-full max-w-md p-6 bg-muted border-l-4 border-primary rounded-lg shadow-sm">
            <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
              Tamilnadu
            </h3>
            <p className="text-text-regular font-body text-gray-600 mb-4">
              Anna Nagar, Madurai
            </p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-regular font-body">
              View Map
            </a>
          </div>
        </AnimateOnScroll>

        {/* Right Section: Map Image */}
        <AnimateOnScroll delay={400} className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <LazyImage
              src="/images/madurai-map.png" // Updated to use the new image
              alt="Map of Eye Net Educational Academy in Madurai"
              className="w-full h-full object-cover"
            />
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default LocationSection;