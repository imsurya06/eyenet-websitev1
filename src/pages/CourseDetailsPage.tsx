"use client";

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { useCourses } from '@/context/CourseContext';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Clock, User, Briefcase, BookOpen, Download, Frown, ArrowLeft } from 'lucide-react';

const CourseDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses, loading } = useCourses();
  const course = courses.find(c => c.id === slug);
  const navigate = useNavigate();

  console.log('CourseDetailsPage - Slug:', slug);
  console.log('CourseDetailsPage - Courses (length):', courses.length);
  console.log('CourseDetailsPage - Loading:', loading);
  console.log('CourseDetailsPage - Found Course:', course);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <AnimateOnScroll isHero={true} delay={500}>
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground text-center">
            Loading Course Details...
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={600}>
          <p className="text-text-medium font-body text-gray-600 text-center">
            Please wait while we fetch the course information.
          </p>
        </AnimateOnScroll>
      </div>
    );
  }

  if (!course) {
    console.error(`CourseDetailsPage: Course with slug "${slug}" not found.`);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-foreground">
        <AnimateOnScroll isHero={true} delay={500}>
          <Frown className="h-20 w-20 text-destructive mb-6" />
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-center">
            Course Not Found
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={600}>
          <p className="text-text-medium font-body text-gray-600 text-center mb-8">
            We couldn't find the course you're looking for. It might have been moved or doesn't exist.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll isHero={true} delay={700}>
          <Button asChild className="px-6 py-3 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/courses">View All Courses</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    );
  }

  // Ensure array properties are always arrays, even if null/undefined from DB
  const learningOutcomes = course.learningOutcomes || [];
  const careerProspects = course.careerProspects || [];
  const modules = course.modules || [];

  return (
    <div className="bg-background text-foreground">
      {/* Back Button */}
      <div className="px-3 md:px-8 lg:px-[80px] pt-8">
        <AnimateOnScroll delay={50}>
          <Button
            variant="ghost"
            className="text-text-regular font-body text-primary hover:bg-primary/10 flex items-center gap-2"
            onClick={() => navigate(-1)} // Navigate back to the previous page
          >
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Button>
        </AnimateOnScroll>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] text-center">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll isHero={true} delay={100}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4 text-foreground">
              {course.title}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-8">
              {course.description.replace(' Details...', '')}
            </p>
          </AnimateOnScroll>
          {course.image && (
            <AnimateOnScroll isHero={true} delay={300} className="mt-8 w-full rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src={course.image} alt={course.title} className="w-full h-auto object-cover object-top" />
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Key Information Section */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <AnimateOnScroll delay={100}>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-1">Duration</h3>
              <p className="text-text-regular font-body text-gray-700">{course.duration}</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <User className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-1">Eligibility</h3>
              <p className="text-text-regular font-body text-gray-700">{course.eligibility}</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-h6-mobile md:text-h6-desktop font-heading mb-1">Category</h3>
              <p className="text-text-regular font-body text-gray-700">
                {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* What You'll Learn & Career Prospects */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimateOnScroll delay={100}>
              <h2 className="text-h3-mobile md:text-h3-desktop font-heading mb-6">
                What You'll Learn
              </h2>
            </AnimateOnScroll>
            <ul className="space-y-3 text-text-regular font-body text-gray-700 list-none p-0">
              {learningOutcomes.map((outcome, index) => (
                <AnimateOnScroll key={index} delay={200 + index * 50} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>{outcome}</span>
                </AnimateOnScroll>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimateOnScroll delay={100}>
              <h2 className="text-h3-mobile md:text-h3-desktop font-heading mb-6">
                Career Prospects
              </h2>
            </AnimateOnScroll>
            <ul className="space-y-3 text-text-regular font-body text-gray-700 list-none p-0">
              {careerProspects.map((prospect, index) => (
                <AnimateOnScroll key={index} delay={200 + index * 50} className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>{prospect}</span>
                </AnimateOnScroll>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-muted">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-10 text-center">
              Course Modules
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <Accordion type="single" collapsible className="w-full">
              {modules.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300">
                  <AccordionTrigger className="text-h6-mobile md:text-h6-desktop font-heading text-foreground hover:no-underline py-4">
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-regular font-body text-gray-700 pb-4">
                    {module.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] text-center">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h3-mobile md:text-h3-desktop font-heading mb-6">
            Ready to Start Your Journey?
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {course.brochureLink !== '#' && (
              <Button asChild variant="outline" className="px-6 py-3 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href={course.brochureLink} download>
                  <Download className="mr-2 h-4 w-4" /> Download Brochure
                </a>
              </Button>
            )}
            <Button asChild className="px-6 py-3 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to={course.enrollLink}>Enroll Now</Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
};

export default CourseDetailsPage;