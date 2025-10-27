import React from 'react';

const ImpactByNumbersSection = () => {
  console.log("ImpactByNumbersSection is rendering."); // Added for debugging

  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '85%', label: 'Student satisfaction' },
    { value: '75%', label: 'Industry recognition' },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[80px] bg-background text-center">
      <p className="text-text-regular font-body text-gray-600 mb-4">Our impact</p>
      <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 max-w-3xl mx-auto">
        Design education by the numbers
      </h2>
      <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
        Transforming creative potential into professional success stories.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-10">
        {/* Video Player */}
        <div className="w-full lg:w-1/2 aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg"> {/* Removed max-w-2xl and mx-auto */}
          <video
            src="/videos/impact-video.mp4"
            controls
            muted
            loop
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Statistics */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"> {/* Adjusted alignment for lg screens */}
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-h2-mobile md:text-h2-desktop font-heading text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-text-medium font-body text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactByNumbersSection;