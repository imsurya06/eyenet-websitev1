"use client";

import React from 'react';
import { Link } from 'react-router-dom';
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
import EnrollmentSuccessDialog from '@/components/EnrollmentSuccessDialog'; // Import the new dialog

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
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [enrolledCourseName, setEnrolledCourseName] = React.useState('');
  const [enrolledUserName, setEnrolledUserName] = React.useState(''); // New state for user name

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Simulate API call or form submission
    setEnrolledCourseName(values.program);
    setEnrolledUserName(values.name); // Set the user's name
    setShowConfetti(true);
    setShowSuccessDialog(true);
    
    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000); 
    
    form.reset(); // Reset form fields after submission
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] flex items-center justify-center"
      style={{ backgroundImage: 'url(/images/admissions-background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8">
        {/* Left Section: Poster */}
        <AnimateOnScroll isHero={true} delay={500} className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-[#0a1930] rounded-lg shadow-xl overflow-hidden max-w-md lg:max-w-none">
            <img
              src="/images/poster-eyenet.png"
              alt="Photoshop Mastery Admission Open Poster"
              className="w-full h-auto object-cover"
            />
          </div>
        </AnimateOnScroll>

        {/* Right Section: Enroll Now Form */}
        <AnimateOnScroll isHero={true} delay={700} className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl max-w-md lg:max-w-none text-center lg:text-left">
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
                          className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                          {...field}
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
                          className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                          {...field}
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
                          className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                          {...field}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full h-12 px-4 py-2 text-text-regular border border-input bg-muted focus:ring-ring focus:ring-offset-background">
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Diploma in Fashion Designing">Diploma in Fashion Designing</SelectItem>
                          <SelectItem value="Diploma in Dress Making (Female)">Diploma in Dress Making (Female)</SelectItem>
                          <SelectItem value="Diploma in Dress Making (Child)">Diploma in Dress Making (Child)</SelectItem>
                          <SelectItem value="Chudithar Making">Chudithar Making</SelectItem>
                          <SelectItem value="Blouse Making">Blouse Making</SelectItem>
                          <SelectItem value="Drafting & Pattern Making">Drafting & Pattern Making</SelectItem>
                          <SelectItem value="Aari Making Course">Aari Making Course</SelectItem>
                          <SelectItem value="Fashion Illustration Course">Fashion Illustration Course</SelectItem>
                          <SelectItem value="Fabric Painting Course">Fabric Painting Course</SelectItem>
                          <SelectItem value="Computer Basics & Applications">Computer Basics & Applications</SelectItem>
                          <SelectItem value="Web Designing">Web Designing</SelectItem>
                          <SelectItem value="Photoshop Mastery">Photoshop Mastery</SelectItem>
                          <SelectItem value="Computer Application & Programming">Computer Application & Programming</SelectItem>
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
        userName={enrolledUserName} // Pass the user name here
        onClose={handleCloseSuccessDialog}
      />
    </section>
  );
};

export default Admissions;