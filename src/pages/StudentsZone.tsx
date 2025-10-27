import React from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const StudentsZone = () => {
  return (
    <AnimateOnScroll isHero={true} delay={200}> {/* Apply hero animation */}
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading">Students Zone Page</h1>
      </div>
    </AnimateOnScroll>
  );
};

export default StudentsZone;