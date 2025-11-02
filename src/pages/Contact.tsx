"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll

const Contact = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir//Suguna+store,+Hamdhiya+towers+2nd+floor,+80+feet+road,+Jn,+Anna+Nagar,+Madurai,+Tamil+Nadu+625020/@9.9291093,78.1409982,15.78z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b00c5072a46551f:0x3feb0d2a94af46bb!2m2!1d78.1485275!2d9.9215582?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-[80px] bg-background text-foreground min-h-[calc(100vh-12rem)] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start w-full">
        {/* Left Section: Contact Form and Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll isHero={true} delay={500}>
            <p className="text-text-regular font-body text-foreground mb-2">Eyenet</p>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={600}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
              Contact us
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={700}>
            <p className="text-text-medium font-body text-gray-600 mb-10">
              We'd love to hear from you...!
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll isHero={true} delay={800} className="space-y-6 w-full max-w-md">
            <form action="https://formspree.io/f/myzbeqer" method="POST" className="space-y-6">
              {/* Hidden input for Formspree redirect */}
              <input type="hidden" name="_next" value={`${window.location.origin}/`} />
              <div>
                <Label htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name" // Added name attribute
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
                  name="email" // Added name attribute
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
                  name="message" // Added name attribute
                  placeholder="Type your message..."
                  rows={6}
                  className="px-4 py-3 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background resize-none"
                />
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <Checkbox id="terms" name="terms" className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" /> {/* Added name attribute */}
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
          </AnimateOnScroll>
        </div>

        {/* Right Section: Map Image */}
        <AnimateOnScroll isHero={true} delay={900} className="w-full h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-lg mx-auto lg:mx-0">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src="/images/madurai-map.png"
              alt="Map of Eye Net Educational Academy in Madurai"
              className="w-full h-full object-cover"
            />
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Contact;