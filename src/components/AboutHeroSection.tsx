"use client";

import React from 'react';

const AboutHeroSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Main Title and Subtitle */}
        <div className="mb-12 md:mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading text-foreground leading-tight">
              Eyenet a <br /> Educational Academy
            </h1>
          </div>
          <div className="flex items-end justify-start lg:justify-end">
            <p className="text-text-regular font-body text-gray-600 text-left lg:text-right">
              Creativity Creates Career.
            </p>
          </div>
        </div>

        {/* Image and Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-10 lg:mb-12">
          {/* Left Image */}
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/about-image-1.png"
              alt="Fashion model in traditional attire"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image and Text */}
          <div className="flex flex-col gap-8">
            <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/about-image-2.png"
                alt="Fashion model in light green attire"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-text-regular font-body text-gray-600 text-justify"> {/* Added text-justify */}
              For 25+ years, Eyenet Institute has trained creative minds in fashion
              design, Photoshop, illustrator, and modern tools
            </p>
          </div>
        </div>

        {/* Bottom Paragraph */}
        <p className="text-text-regular font-body text-gray-600 text-justify max-w-4xl mx-auto"> {/* Added text-justify */}
          Guided by our Founder and Director's vision, Eyenet shapes confident, skilled designers through hands-on training, industry-relevant courses, and real-world projects. Combining creativity, technology, and professional discipline, we equip students to master tools like Photoshop and Illustrator and succeed in today's competitive design industry.
        </p>
      </div>
    </section>
  );
};

export default AboutHeroSection;