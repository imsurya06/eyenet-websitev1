"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ConfettiOverlay from '@/components/ConfettiOverlay';
import EnrollmentSuccessDialog from '@/components/EnrollmentSuccessDialog';
import { useCourses } from '@/context/CourseContext'; // Import useCourses

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  mobile: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be 10 digits.' }),
  program: z.string().min(1, { message: 'Please select a program.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

const Admissions = () => {
  const { courses, loading: coursesLoading } = useCourses(); // Fetch courses and loading state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      program: '',
      terms: false,
    },
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [enrolledCourseName, setEnrolledCourseName] = useState('');
  const [enrolledUserName, setEnrolledUserName] = useState('');

  const googleMapsUrl = "https://www.google.com/maps/dir//Suguna+store,+Hamdhiya+towers+2nd+floor,+80+feet+road,+Jn,+Anna+Nagar,+Madurai,+Tamil+Nadu+625020/@9.9291093,78.1409982,15.78z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b00c5072a46551f:0x3feb0d2a94af46bb!2m2!1d78.1485275!2d9.9215582?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real application, you would send this data to your backend/Formspree
    console.log("Form submitted:", values);

    // Simulate successful submission
    setEnrolledCourseName(values.program);
    setEnrolledUserName(values.name);
    setShowConfetti(true);
    setShowSuccessDialog(true);
    form.reset(); // Reset form after successful submission
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setShowConfetti(false); // Ensure confetti also stops if dialog is closed early
  };

  return (
    <section className="bg-background min-h-screen py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8">
        {/* Left Section: Location Info */}
        <AnimateOnScroll isHero={true} delay={500} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-foreground">
            Find Us Here
          </h2>
          <p className="text-text-medium font-body text-gray-600 mb-10 max-w-md">
            Visit our academy or contact us directly.
          </p>
          <div className="w-full max-w-md p-6 bg-muted border-l-4 border-primary rounded-lg shadow-sm mb-8">
            <h3 className="text-h5-mobile md:text-h5-desktop font-heading mb-2 text-foreground">
              Tamilnadu
            </h3>
            <p className="text-text-regular font-body text-gray-600 mb-4">
              Anna Nagar, Madurai
            </p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-regular font-body">
              View Map
            </a>
          </div>
          <div className="w-full max-w-md aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <img
                src="/images/madurai-map.png"
                alt="Map of Eye Net Educational Academy in Madurai"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </AnimateOnScroll>

        {/* Right Section: Enroll Now Form */}
        <AnimateOnScroll isHero={true} delay={700} className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl w-full text-center">
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-2 text-foreground">
              Enroll Now
            </h2>
            <p className="text-text-medium font-body text-gray-600 mb-8">
              Let's Start your design journey
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                        Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder=""
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                        Email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder=""
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                        Mobile Number*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder=""
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                        Program*
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={coursesLoading}>
                        <FormControl>
                          <SelectTrigger
                            className="w-full h-12 px-4 py-2 text-text-regular border border-input bg-muted focus:ring-ring focus:ring-offset-background"
                          >
                            <SelectValue placeholder={coursesLoading ? "Loading programs..." : "Select a program"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.length > 0 ? (
                            courses.map((course) => (
                              <SelectItem key={course.id} value={course.title}>
                                {course.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-programs" disabled>
                              No programs available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          required
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="terms" className="text-text-regular font-body text-gray-600 text-left">
                          I accept the{' '}
                          <Link to="/terms-of-service" className="underline hover:text-primary">
                            Terms
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 px-6 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out hover:scale-[1.02]">
                  Enroll
                </Button>
              </form>
            </Form>
          </div>
        </AnimateOnScroll>
      </div>
      <ConfettiOverlay show={showConfetti} />
      <EnrollmentSuccessDialog
        show={showSuccessDialog}
        courseName={enrolledCourseName}
        userName={enrolledUserName}
        onClose={handleCloseSuccessDialog}
      />
    </section>
  );
};

export default Admissions;