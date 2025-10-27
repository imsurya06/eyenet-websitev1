"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Contact = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-[80px] bg-background text-foreground min-h-[calc(100vh-12rem)] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start w-full">
        {/* Left Section: Contact Form and Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-text-regular font-body text-foreground mb-2">Eyenet</p>
          <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
            Contact us
          </h1>
          <p className="text-text-medium font-body text-gray-600 mb-10">
            We'd love to hear from you...!
          </p>

          <form className="space-y-6 w-full max-w-md">
            <div>
              <Label htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block text-left">
                Name
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
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-text-regular font-body text-foreground mb-2 block text-left">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                rows={6}
                className="px-4 py-3 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background resize-none"
              />
            </div>
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <Checkbox id="terms" className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
              <Label htmlFor="terms" className="text-text-regular font-body text-gray-600">
                I accept the{' '}
                <Link to="/terms-of-service" className="underline hover:text-primary">
                  Terms
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full h-12 px-6 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit
            </Button>
          </form>
        </div>

        {/* Right Section: Map Image */}
        <div className="w-full h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-lg mx-auto lg:mx-0">
          <img
            src="/images/madurai-map.png"
            alt="Map of Eye Net Educational Academy in Madurai"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;