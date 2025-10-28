"use client";

import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CourseDropdownMenuItem from './CourseDropdownMenuItem.tsx';
import { cn } from '@/lib/utils'; // Import cn utility

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
    heading: 'Explore',
    links: [
      { name: 'Students Zone', description: 'Discover student life and resources', href: '/explore/students-zone', icon: 'PersonStanding' },
      { name: 'Infrastructure', description: 'Explore our facilities and campus', href: '/explore/infrastructure', icon: 'Home' },
      { name: 'Gallery', description: 'View our creative works and events', href: '/explore/gallery', icon: 'LayoutGrid' },
      { name: 'News & Events', description: 'Stay updated with the latest happenings', href: '/explore/news-events', icon: 'CalendarDays' },
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkHref: '/admissions'
    }
  },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false); // State for mobile sheet

  const coursesTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const exploreTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = (dropdownName: 'Courses' | 'Explore') => {
    const timeoutRef = dropdownName === 'Courses' ? coursesTimeoutRef : exploreTimeoutRef;
    const setOpenState = dropdownName === 'Courses' ? setCoursesOpen : setExploreOpen;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenState(true);
  };

  const handleClose = (dropdownName: 'Courses' | 'Explore') => {
    const timeoutRef = dropdownName === 'Courses' ? coursesTimeoutRef : exploreTimeoutRef;
    const setOpenState = dropdownName === 'Courses' ? setCoursesOpen : setExploreOpen;

    timeoutRef.current = setTimeout(() => {
      setOpenState(false);
    }, 150); // Delay for closing
  };

  // Determine if a dropdown's sub-links are active
  const isDropdownPathActive = (links: { href: string }[]) => {
    return links.some(link => location.pathname.startsWith(link.href));
  };

  const coursesItem = navItems.find(item => item.name === 'Courses' && item.type === 'dropdown');
  const isCoursesPathActive = coursesItem ? isDropdownPathActive(coursesItem.links) : false;

  const exploreItem = navItems.find(item => item.name === 'Explore' && item.type === 'dropdown');
  const isExplorePathActive = exploreItem ? isDropdownPathActive(exploreItem.links) : false;

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground shadow-lg py-2">
      <div className="flex h-16 items-center justify-between px-3 md:px-8 lg:px-[80px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            {/* Nav Links - Centered */}
            <div className="hidden md:flex flex-grow justify-center">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  item.type === 'link' ? (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "text-regular font-normal transition-colors hover:text-primary px-4 py-2 rounded-md",
                          isActive && "text-primary"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <DropdownMenu
                      key={item.name}
                      open={item.name === 'Courses' ? coursesOpen : exploreOpen}
                      onOpenChange={(newOpenState) => {
                        // Only update our state if Radix is trying to close it,
                        // otherwise let our hover handlers manage opening.
                        if (!newOpenState) {
                          handleClose(item.name as 'Courses' | 'Explore');
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "font-normal transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-4 py-2",
                            "!text-medium", // Changed to !text-medium
                            (item.name === 'Courses' && (isCoursesPathActive || coursesOpen)) && "text-primary",
                            (item.name === 'Explore' && (isExplorePathActive || exploreOpen)) && "text-primary"
                          )}
                          onMouseEnter={() => handleOpen(item.name as 'Courses' | 'Explore')}
                          onMouseLeave={() => handleClose(item.name as 'Courses' | 'Explore')}
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-80 p-4 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
                        align="start"
                        onMouseEnter={() => handleOpen(item.name as 'Courses' | 'Explore')}
                        onMouseLeave={() => handleClose(item.name as 'Courses' | 'Explore')}
                      >
                        {item.heading && (
                          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
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
                              <Link to={item.footer.linkHref} className="text-primary hover:underline font-normal">
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
              <Button variant="default" className="hover:animate-shake"> {/* This class will now work */}
                Apply
              </Button>
            </div>
          </>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                    // Close sheet on link click
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "text-lg font-normal hover:text-primary",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <React.Fragment key={item.name}>
                      <span
                        className={cn(
                          "text-lg font-normal",
                          (item.name === 'Courses' && isCoursesPathActive) && "text-primary",
                          (item.name === 'Explore' && isExplorePathActive) && "text-primary",
                          !(item.name === 'Courses' && isCoursesPathActive) && !(item.name === 'Explore' && isExplorePathActive) && "text-muted-foreground"
                        )}
                      >
                        {item.name}
                      </span>
                      <div className="ml-4 flex flex-col gap-2">
                        {item.links.map((link) => (
                          // Close sheet on link click
                          <NavLink
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsSheetOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "text-base hover:text-primary",
                                isActive ? "text-primary" : "text-muted-foreground"
                              )
                            }
                          >
                            {link.name}
                          </NavLink>
                        ))}
                      </div>
                    </React.Fragment>
                  )
                ))}
                <Button variant="outline" asChild className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact" onClick={() => setIsSheetOpen(false)}>Contact</Link>
                </Button>
                <Button variant="default" className="mt-2 hover:animate-shake" onClick={() => setIsSheetOpen(false)}> {/* This class will now work */}
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