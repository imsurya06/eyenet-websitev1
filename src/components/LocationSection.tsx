import React from 'react';
import { Link } from 'react-router-dom';

const LocationSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[80px] bg-background text-center lg:text-left">
      <p className="text-text-regular font-body text-gray-600 mb-4">Our location</p>
      <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-16 max-w-3xl mx-auto lg:mx-0">
        We are Madurai based institute
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Left Section: Address Card */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-full max-w-md p-6 bg-muted border-l-4 border-primary rounded-lg shadow-sm">
            <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
              Tamilnadu
            </h3>
            <p className="text-text-regular font-body text-gray-600 mb-4">
              Anna Nagar, Madurai
            </p>
            <Link to="/contact" className="text-primary hover:underline text-regular font-body">
              View Map
            </Link>
          </div>
        </div>

        {/* Right Section: Map Image */}
        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/madurai-map.png" // Updated to use the new image
            alt="Map of Eye Net Educational Academy in Madurai"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;