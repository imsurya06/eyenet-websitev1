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
// Removed: import { useForm } from 'react-hook-form';
// Removed: import { zodResolver } from '@hookform/resolvers/zod';
// Removed: import * as z from 'zod';
// Removed: import {
// Removed:   Form,
// Removed:   FormControl,
// Removed:   FormField,
// Removed:   FormItem,
// Removed:   FormLabel,
// Removed:   FormMessage,
// Removed: } from '@/components/ui/form';
// Removed: import ConfettiOverlay from '@/components/ConfettiOverlay';
// Removed: import EnrollmentSuccessDialog from '@/components/EnrollmentSuccessDialog';

// Removed: formSchema definition

const Admissions = () => {
  // Removed: useForm hook and onSubmit function

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
          <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl w-full text-center">
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-2 text-foreground">
              Enroll Now
            </h2>
            <p className="text-text-medium font-body text-gray-600 mb-8">
              Let's Start your design journey
            </p>
            <form action="https://formspree.io/f/myzbeqer" method="POST" className="space-y-6">
              {/* Hidden input for Formspree redirect */}
              <input type="hidden" name="_next" value={`${window.location.origin}/`} />
              
              <div>
                <Label htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block text-left">
                  Name*
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder=""
                  name="name"
                  required
                  className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-text-regular font-body text-foreground mb-2 block text-left">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  name="email"
                  required
                  className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                />
              </div>
              
              <div>
                <Label htmlFor="mobile" className="text-text-regular font-body text-foreground mb-2 block text-left">
                  Mobile Number*
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder=""
                  name="mobile"
                  required
                  className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                />
              </div>
              
              <div>
                <Label htmlFor="program" className="text-text-regular font-body text-foreground mb-2 block text-left">
                  Program*
                </Label>
                <Select name="program" required> {/* Added name and required to Select */}
                  <SelectTrigger
                    id="program"
                    className="w-full h-12 px-4 py-2 text-text-regular border border-input bg-muted focus:ring-ring focus:ring-offset-background"
                  >
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
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
              </div>
              
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <Checkbox
                  id="terms"
                  name="terms"
                  required
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="terms" className="text-text-regular font-body text-gray-600 text-left">
                  I accept the{' '}
                  <Link to="/terms-of-service" className="underline hover:text-primary">
                    Terms
                  </Link>
                </Label>
              </div>
              
              <Button type="submit" className="w-full h-12 px-6 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out hover:scale-[1.02]">
                Enroll
              </Button>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Admissions;