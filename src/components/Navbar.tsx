"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-background text-foreground shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Login Button - Desktop */}
        {!isMobile && (
          <Button variant="default" className="hidden md:inline-flex">
            Login
          </Button>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button variant="default" className="mt-4">
                  Login
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
};

export default Navbar;