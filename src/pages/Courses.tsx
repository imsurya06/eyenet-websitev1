"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User } from 'lucide-react'; // Import Clock and User icons
import AnimateOnScroll from '@/components/AnimateOnScroll';
import CallToActionSection from '@/components/CallToActionSection';
import { useCourses } from '@/context/CourseContext';

const Courses = () => {
  const { courses, loading } = useCourses();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEnrollClick = (e: React.MouseEvent, enrollLink: string) => {
    e.stopPropagation(); // Prevent the parent Link from being triggered
    navigate(enrollLink);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for All Courses */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] text-center">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll isHero={true} delay={100}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
              Our Comprehensive Courses
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-8">
              Explore our diverse range of fashion design and computer courses, crafted to ignite your creativity and build your professional skills.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-10 px-3 md:px-8 lg:px-[80px] bg-muted text-foreground">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-10 text-center">
              Discover Your Path
            </h2>
          </AnimateOnScroll>

          {loading ? (
            <AnimateOnScroll delay={200}>
              <p className="text-text-medium font-body text-gray-600 text-center">
                Loading courses...
              </p>
            </AnimateOnScroll>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <AnimateOnScroll key={course.id} delay={200 + index * 75}>
                  {/* Wrap the entire card with Link */}
                  <Link to={`/courses/${course.category === 'fashion' ? 'fashion-design' : 'computer-courses'}/${course.id}`} className="block group h-full">
                    <div className="bg-white rounded-lg shadow-md drop-shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="inline-block bg-muted text-text-small font-body text-gray-600 px-3 py-1 rounded-full mb-4 border border-input">
                          {course.tag} / {course.category === 'fashion' ? 'Fashion' : 'Computer'}
                        </span>
                        <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground h-[4.9rem] overflow-hidden">
                          {course.title}
                        </h3>
                        <p className="text-text-regular font-body text-gray-600 mb-4">
                          {truncateDescription(course.description.replace(' Details...', ''), 120)}{' '}
                          <Link to={`/courses/${course.category === 'fashion' ? 'fashion-design' : 'computer-courses'}/${course.id}`} className="text-primary hover:underline ml-1" onClick={(e) => e.stopPropagation()}>
                            more...
                          </Link>
                        </p>
                        <div className="flex items-center gap-4 text-text-small font-body text-gray-700 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-primary" />
                            <span>{course.eligibility}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-auto md:flex-row md:justify-between">
                          {/* Download Brochure - this should work as is because it's a direct download */}
                          <a href={course.brochureLink} download onClick={(e) => e.stopPropagation()} className="text-text-small font-body text-primary hover:underline whitespace-nowrap w-full text-center md:w-auto md:text-left">
                            Download Brochure
                          </a>
                          {/* Enroll Button - use onClick to navigate and stop propagation */}
                          <Button
                            className="bg-primary hover:bg-primary/90 px-4 py-2 text-text-small flex-shrink-0 w-full md:w-auto transition-all duration-300 ease-in-out hover:scale-[1.02] text-white"
                            onClick={(e) => handleEnrollClick(e, course.enrollLink)}
                          >
                            Enroll <ArrowRight className="ml-1 h-3 w-3 inline-block" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <AnimateOnScroll delay={200}>
              <p className="text-text-medium font-body text-gray-600 text-center">
                No courses available at the moment. Please check back later!
              </p>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      <CallToActionSection />
    </div>
  );
};

export default Courses;