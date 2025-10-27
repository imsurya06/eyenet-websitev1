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
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Admissions = () => {
  return (
    <AnimateOnScroll isHero={true} delay={500}> {/* Apply hero animation to the main section */}
      <section
        className="relative min-h-screen bg-cover bg-center py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/admissions-background.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8">
          {/* Left Section: Poster */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-[#0a1930] rounded-lg shadow-xl overflow-hidden max-w-md lg:max-w-none">
              <img
                src="/images/poster-eyenet.png"
                alt="Photoshop Mastery Admission Open Poster"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Section: Enroll Now Form */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl max-w-md lg:max-w-none text-center lg:text-left">
              <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-2 text-foreground">
                Enroll Now
              </h2>
              <p className="text-text-medium font-body text-gray-600 mb-8">
                Let's Start your design journey
              </p>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block text-left">
                    Name*
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder=""
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
                    className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                  />
                </div>
                <div>
                  <Label htmlFor="program" className="text-text-regular font-body text-foreground mb-2 block text-left">
                    Program*
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full h-12 px-4 py-2 text-text-regular border border-input bg-muted focus:ring-ring focus:ring-offset-background">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diploma-fashion-designing">Diploma in Fashion Designing</SelectItem>
                      <SelectItem value="diploma-dress-making-female">Diploma in Dress Making (Female)</SelectItem>
                      <SelectItem value="diploma-dress-making-kids">Diploma in Dress Making (kids)</SelectItem>
                      <SelectItem value="chudithar-making">Chudithar Making</SelectItem>
                      <SelectItem value="blouse-making">Blouse Making</SelectItem>
                      <SelectItem value="drafting-pattern-making">Drafting & Pattern Making</SelectItem>
                      <SelectItem value="aari-making-course">Aari Making Course</SelectItem> {/* Corrected here */}
                      <SelectItem value="fashion-illustration-course">Fashion Illustration Course</SelectItem>
                      <SelectItem value="fabric-painting-course">Fabric Painting Course</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
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
          </div>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default Admissions;