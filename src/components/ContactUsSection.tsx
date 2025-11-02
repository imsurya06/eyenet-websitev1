"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

const ContactUsSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Section: Contact Information */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
              Contact us
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-10 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </AnimateOnScroll>

          <div className="space-y-6 w-full flex flex-col items-center lg:items-start"> {/* Added flex-col items-center for mobile centering */}
            <AnimateOnScroll delay={300}>
              <div className="flex items-center gap-4 justify-center lg:justify-start"> {/* Added justify-center for mobile centering */}
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:email@example.com" className="text-text-regular font-body text-foreground hover:underline">
                  email@example.com
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={400}>
              <div className="flex items-center gap-4 justify-center lg:justify-start"> {/* Added justify-center for mobile centering */}
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+15550000000" className="text-text-regular font-body text-foreground hover:underline">
                  +1 (555) 000-0000
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={500}>
              <div className="flex items-center gap-4 justify-center lg:justify-start"> {/* Added justify-center for mobile centering */}
                <MapPin className="h-6 w-6 text-primary" />
                <p className="text-text-regular font-body text-foreground">
                  123 Sample St, Sydney NSW 2000 AU
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <AnimateOnScroll delay={600} className="w-full max-w-lg mx-auto lg:mx-0">
          <form action="https://formspree.io/f/myzbeqer" method="POST" className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block">
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
              <Label htmlFor="email" className="text-text-regular font-body text-foreground mb-2 block">
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
              <Label htmlFor="message" className="text-text-regular font-body text-foreground mb-2 block">
                Message
              </Label>
              <Textarea
                id="message"
                name="message" // Added name attribute
                placeholder="Type your message..."
                rows={6}
                className="px-4 py-3 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background resize-y"
              />
            </div>
            <div className="flex items-center space-x-2">
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
    </section>
  );
};

export default ContactUsSection;