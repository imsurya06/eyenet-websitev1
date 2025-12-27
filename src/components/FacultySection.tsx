"use client";

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { useFaculty } from '@/context/FacultyContext';
import { GraduationCap, Award } from 'lucide-react';

const FacultySection = () => {
  const { faculty, loading } = useFaculty();

  const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000; // Two weeks in milliseconds

  return (
    <section id="faculty-section" className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground text-center">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
            Meet Our Esteemed Faculty
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-16 max-w-2xl mx-auto">
            Our dedicated team of educators and industry experts are here to guide your creative journey.
          </p>
        </AnimateOnScroll>

        {loading ? (
          <AnimateOnScroll delay={300}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              Loading faculty information...
            </p>
          </AnimateOnScroll>
        ) : faculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => {
              const createdAtDate = new Date(member.created_at);
              const isNewFaculty = (new Date().getTime() - createdAtDate.getTime()) < twoWeeksInMs;

              return (
                <AnimateOnScroll key={member.id} delay={300 + index * 100}>
                  <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="w-full h-64 overflow-hidden relative">
                      <img
                        src={member.image || '/public/placeholder.svg'}
                        alt={member.name}
                        className="w-full h-full object-contain"
                      />
                      {isNewFaculty && (
                        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-text-tiny font-body px-2 py-1 rounded-full">
                          New Faculty
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-1 text-text-regular font-body text-gray-600">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span>{member.qualification}</span>
                      </div>
                      {member.achievements && (
                        <div className="flex items-center gap-2 mb-4 text-text-regular font-body text-gray-600">
                          <Award className="h-4 w-4 text-primary" />
                          <span>{member.achievements}</span>
                        </div>
                      )}
                      <p className="text-text-regular font-body text-gray-700 flex-grow">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        ) : (
          <AnimateOnScroll delay={300}>
            <p className="text-text-medium font-body text-gray-600 text-center">
              No faculty members to display at the moment.
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
};

export default FacultySection;