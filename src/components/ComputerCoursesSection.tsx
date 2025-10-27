"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ComputerCoursesSection = () => {
  const courses = [
    {
      image: '/images/computer-basics-applications.png',
      tag: 'Course',
      title: 'Computer Basics & Applications',
      description: 'Computer concepts, Windows, Networking principles, Microsoft office, C, C++ Programming. Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/web-designing.png',
      tag: 'Course',
      title: 'Web Designing',
      description: 'Computer Basics, MS-front Page, Dreamweaver, HTML, Gif animation, Photoshop. Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/photoshop-mastery.png',
      tag: 'Course',
      title: 'Photoshop Mastery',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/computer-application-programming.png',
      tag: 'Course',
      title: 'Computer Application & Programming',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros. Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
          Computer Courses
        </h1>
        <p className="text-h4-mobile md:text-h4-desktop font-heading text-primary mb-8">
          Digital Skills for the Modern World
        </p>

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
                  <Link to={`/courses/computer-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">
                    {course.title}
                  </Link>
                </h3>
                <p className="text-text-regular font-body text-gray-600 mb-6">
                  {course.description.split('Details...')[0]}
                  <Link to={`/courses/computer-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline ml-1">
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

export default ComputerCoursesSection;