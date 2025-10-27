"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MoreFashionCoursesSection = () => {
  const courses = [
    {
      image: '/images/img7.png', // Updated to use img7.png
      tag: 'Course',
      title: 'Aari Making Course',
      description: 'An Aari Making Course is a specialized program designed to teach the intricate art of Aari Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/img8.png', // Updated to use img8.png
      tag: 'Course',
      title: 'Fashion Illustration Course',
      description: 'A Fashion Illustration Course is a specialized program designed to teach the art of drawing Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/img9.png', // Updated to use img9.png
      tag: 'Course',
      title: 'Fabric Painting Course',
      description: 'A Fabric Painting Course is a creative program designed to teach the techniques and skills Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4">
                  {course.tag}
                </span>
                <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
                  <Link to={`/courses/fashion-design/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">
                    {course.title}
                  </Link>
                </h3>
                <p className="text-text-regular font-body text-gray-600 mb-6">
                  {course.description.split('Details...')[0]}
                  <Link to={`/courses/fashion-design/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline ml-1">
                    Details...
                  </Link>
                </p>
                <div className="flex flex-col items-center gap-2 mt-auto md:flex-row md:justify-between">
                  <Link to={course.brochureLink} className="text-text-small font-body text-primary hover:underline whitespace-nowrap w-full text-center md:w-auto md:text-left">
                    Download Brochure
                  </Link>
                  <Button asChild className="bg-primary hover:bg-primary/90 px-4 py-2 text-text-small flex-shrink-0 w-full md:w-auto">
                    <Link to={course.enrollLink} className="text-white">
                      Enroll <ArrowRight className="ml-1 h-3 w-3 inline-block" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreFashionCoursesSection;