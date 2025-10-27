import React from 'react';
import InfrastructureHeroSection from '@/components/InfrastructureHeroSection';
import InfrastructureGridSection from '@/components/InfrastructureGridSection'; // Import the new component

const Infrastructure = () => {
  return (
    <>
      <InfrastructureHeroSection />
      <InfrastructureGridSection /> {/* Add the new grid section here */}
    </>
  );
};

export default Infrastructure;