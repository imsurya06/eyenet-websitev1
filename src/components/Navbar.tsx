"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel, // Import DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Tablet, Activity, Laptop } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CourseDropdownMenuItem from './CourseDropdownMenuItem';

const navItems = [
  { type: 'link', name: 'Home', href: '/' },
  { type: 'link', name: 'About', href: '/about' },
  { type: 'link', name: 'Admissions', href: '/admissions' },
  {
    type: 'dropdown',
    name: 'Courses',
    heading: 'courses',
    links: [
      { name: 'Fashion design Courses', description: 'Professional certification for creative professionals', href: '/courses/fashion-design', icon: 'Tablet' },
      { name: 'Graphic design', description: 'Digital and print design curriculum', href: '/courses/graphic-design', icon: 'Activity' },
      { name: 'Computer courses', description: 'Digital and print design curriculum', href: '/courses/computer-courses', icon: 'Laptop' },
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkHref: '/admissions'
    }
  },
  {
    type: 'dropdown',
    name: 'Explore',
    links: [
      { name: 'Gallery', href: '/gallery' },
      { name: 'Events', href: '/explore/events' },
      { name: 'Blog', href: '/explore/blog' },
    ],
  },
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
          <>
            {/* Nav Links - Centered */}
            <div className="hidden md:flex flex-grow justify-center">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  item.type === 'link' ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-sm font-medium transition-colors hover:text-primary data-[state=open]:text-primary"
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80 p-4 bg-muted" align="start"> {/* Added bg-muted and align="start" */}
                        {item.heading && (
                          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground"> {/* Used DropdownMenuLabel */}
                            {item.heading}
                          </DropdownMenuLabel>
                        )}
                        <div className="grid gap-1">
                          {item.links.map((link) => (
                            <CourseDropdownMenuItem
                              key={link.name}
                              href={link.href}
                              title={link.name}
                              description={link.description}
                              icon={link.icon as keyof typeof LucideIcons}
                            />
                          ))}
                        </div>
                        {item.footer && (
                          <>
                            <DropdownMenuSeparator className="my-2" />
                            <div className="px-3 py-2 text-sm">
                              {item.footer.text}{' '}
                              <Link to={item.footer.linkHref} className="text-primary hover:underline font-medium">
                                {item.footer.linkText}
                              </Link>
                            </div>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                ))}
              </div>
            </div>

            {/* Buttons - Right aligned */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/contact">Contact</Link>
              </Button>
              <Button variant="default">
                Apply
              </Button>
            </div>
          </>
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
                {navItems.map((item) => (
                  item.type === 'link' ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <React.Fragment key={item.name}>
                      <span className="text-lg font-medium text-muted-foreground">{item.name}</span>
                      <div className="ml-4 flex flex-col gap-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.name}
                            to={link.href}
                            className="text-base text-muted-foreground hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </React.Fragment>
                  )
                ))}
                <Button variant="outline" asChild className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact">Contact</Link>
                </Button>
                <Button variant="default" className="mt-2">
                  Apply
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