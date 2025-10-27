"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, X, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Courses', href: '/courses' },
    { name: 'Explore', href: '/explore' },
  ];

  const secondaryNavLinks = [
    { name: 'Photography', href: '/courses/photography' }, // Assuming a photography course page
    { name: 'Gallery', href: '/explore/gallery' },
    { name: 'News', href: '/explore/news-events' },
    { name: 'FAQ', href: '/faq' }, // Assuming a dedicated FAQ page
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', name: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', name: 'Instagram' },
    { icon: X, href: 'https://x.com', name: 'X' },
    { icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', name: 'YouTube' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' }, // Assuming these pages exist
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookies Settings', href: '/cookies-settings' },
  ];

  return (
    <footer className="bg-muted text-foreground pt-12 md:pt-16 lg:pt-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 md:pb-16 lg:pb-20">
        {/* Column 1: Logo and Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="mb-6">
            <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-10" />
          </Link>
          <p className="text-text-regular font-body text-gray-600 mb-4">
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow h-10 px-3 py-2 text-text-regular border border-input bg-background focus-visible:ring-ring focus-visible:ring-offset-background"
            />
            <Button className="h-10 px-4 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe
            </Button>
          </div>
          <p className="text-text-small font-body text-gray-500">
            By subscribing you agree to with our{' '}
            <Link to="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </Link>{' '}
            and provide consent to receive updates from our company.
          </p>
        </div>

        {/* Column 2 & 3: Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-2">
          <h4 className="text-h6-mobile md:text-h6-desktop font-heading mb-6 text-foreground md:text-left">
            Links
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
            <ul className="space-y-2 md:text-left">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-text-regular font-body text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 md:text-left">
              {secondaryNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-text-regular font-body text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 4: Follow Us */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-h6-mobile md:text-h6-desktop font-heading mb-6 text-foreground md:text-left">
            Follow Us
          </h4>
          <ul className="space-y-3 md:text-left">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-regular font-body text-gray-600 hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-background py-6 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 lg:px-[80px] flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <p className="text-text-small font-body text-gray-500">
            © {currentYear} eyenet. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-text-small font-body text-gray-500 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;