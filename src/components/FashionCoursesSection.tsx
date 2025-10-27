"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FashionCoursesSection = () => {
  const courses = [
    {
      image: '/images/img1.png', // Using previously uploaded image
      tag: 'Course',
      title: 'Diploma in Fashion Designing',
      description: 'A Diploma in Fashion Designing is a specialized program designed to equip students with the skills and Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/img2.png', // Using previously uploaded image
      tag: 'Course',
      title: 'Diploma in Dress Making (Female)',
      description: 'A six-month Diploma in Female Dress Making is an accelerated program designed to provide. Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
    {
      image: '/images/img3.png', // Using previously uploaded image
      tag: 'Course',
      title: 'Diploma in Dress Making (Child)',
      description: 'A six-month Diploma in Kids Dress Making is a focused program designed to teach the specific Details...',
      brochureLink: '#', // Placeholder
      enrollLink: '/admissions',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
          Courses
        </h1>
        <p className="text-h4-mobile md:text-h4-desktop font-heading text-primary mb-8">
          Fashion Designing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4">
                  {course.tag}
                </span>
                <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
                  {course.title}
                </h3>
                <p className="text-text-regular font-body text-gray-600 mb-6">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <Link to={course.brochureLink} className="text-text-regular font-body text-primary hover:underline">
                    Download Brochure
                  </Link>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-text-regular">
                    <Link to={course.enrollLink}>
                      Enroll <ArrowRight className="ml-2 h-4 w-4 inline-block" />
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

export default FashionCoursesSection;