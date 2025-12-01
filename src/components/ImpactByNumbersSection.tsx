"use client";

import React, { useRef, useEffect, useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const ImpactByNumbersSection = () => {
  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '85%', label: 'Student satisfaction' },
    { value: '75%', label: 'Industry recognition' },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play video when it enters the viewport
          videoElement.play().catch(error => console.log("Video play interrupted:", error));
          setIsPlaying(true);
        } else {
          // Pause video when it leaves the viewport
          videoElement.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-center">
      <AnimateOnScroll delay={100}>
        <p className="text-text-regular font-body text-gray-600 mb-4">Our impact</p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-8 max-w-3xl mx-auto">
          Design education by the numbers
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={300}>
        <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
          Transforming creative potential into professional success stories.
        </p>
      </AnimateOnScroll>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-10 max-w-7xl mx-auto">
        {/* Video Player */}
        <AnimateOnScroll delay={400} className="w-full lg:w-1/2">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={videoRef} // Assign the ref to the video element
              controls
              muted
              loop
              // Removed autoPlay from here, as it's now controlled by IntersectionObserver
              // poster="/public/placeholder.svg"
              className="w-full h-full object-cover"
              src="/videos/impact-video.mp4"
            >
              <source src="/videos/impact-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </AnimateOnScroll>

        {/* Statistics */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} delay={500 + index * 100}>
              <div>
                <p className="text-h2-mobile md:text-h2-desktop font-heading text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-text-medium font-body text-gray-600">
                  {stat.label}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactByNumbersSection;