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
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons
import { useIsMobile } from '@/hooks/use-mobile';
import CourseDropdownMenuItem from './CourseDropdownMenuItem.tsx';
import AdminMenu from './AdminMenu';
import { cn } from '@/lib/utils';

const navItems = [
  { type: 'link', name: 'Home', to: '/' }, // Changed href to to
  { type: 'link', name: 'About', to: '/about' }, // Changed href to to
  { type: 'link', name: 'Admissions', to: '/admissions' }, // Changed href to to
  {
    type: 'dropdown',
    name: 'Courses',
    heading: 'courses',
    links: [
      { name: 'Fashion design Courses', description: 'Professional certification for creative professionals', to: '/courses/fashion-design', icon: LucideIcons.Tablet }, // Changed href to to, passed icon component
      { name: 'Computer courses', description: 'Digital and print design curriculum', to: '/courses/computer-courses', icon: LucideIcons.Laptop }, // Changed href to to, passed icon component
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkTo: '/admissions' // Changed linkHref to linkTo
    }
  },
  {
    type: 'dropdown',
    name: 'Explore',
    heading: 'Explore',
    links: [
      { name: 'Students Zone', description: 'Discover student life and resources', to: '/explore/students-zone', icon: LucideIcons.PersonStanding }, // Changed href to to, passed icon component
      { name: 'Infrastructure', description: 'Explore our facilities and campus', to: '/explore/infrastructure', icon: LucideIcons.Home }, // Changed href to to, passed icon component
      { name: 'Gallery', description: 'View our creative works and events', to: '/explore/gallery', icon: LucideIcons.LayoutGrid }, // Changed href to to, passed icon component
      { name: 'News & Events', description: 'Stay updated with the latest happenings', to: '/explore/news-events', icon: LucideIcons.CalendarDays }, // Changed href to to, passed icon component
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkTo: '/admissions' // Changed linkHref to linkTo
    }
  },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const coursesCloseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const exploreCloseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = (setOpen: React.Dispatch<React.SetStateAction<boolean>>, closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleClose = (setOpen: React.Dispatch<React.SetStateAction<boolean>>, closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // Determine if a dropdown's sub-links are active
  const isDropdownPathActive = (links: { to: string }[]) => { // Changed href to to
    return links.some(link => location.pathname.startsWith(link.to)); // Changed href to to
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
          <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-8 md:h-14" /> {/* Increased size for desktop */}
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
                      to={item.to} // Using 'to'
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
                        if (!newOpenState) {
                          if (item.name === 'Courses') handleClose(setCoursesOpen, coursesCloseTimeoutRef);
                          else handleClose(setExploreOpen, exploreCloseTimeoutRef);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild
                        onMouseEnter={() => {
                          if (item.name === 'Courses') handleOpen(setCoursesOpen, coursesCloseTimeoutRef);
                          else handleOpen(setExploreOpen, exploreCloseTimeoutRef);
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'Courses') handleClose(setCoursesOpen, coursesCloseTimeoutRef);
                          else handleClose(setExploreOpen, exploreCloseTimeoutRef);
                        }}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "font-normal transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-4 py-2",
                            "!text-medium",
                            (item.name === 'Courses' && (isCoursesPathActive || coursesOpen)) && "text-primary",
                            (item.name === 'Explore' && (isExplorePathActive || exploreOpen)) && "text-primary"
                          )}
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-80 p-4 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
                        align="start"
                        onMouseEnter={() => {
                          if (item.name === 'Courses') handleOpen(setCoursesOpen, coursesCloseTimeoutRef);
                          else handleOpen(setExploreOpen, exploreCloseTimeoutRef);
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'Courses') handleClose(setCoursesOpen, coursesCloseTimeoutRef);
                          else handleClose(setExploreOpen, exploreCloseTimeoutRef);
                        }}
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
                              to={link.to} // Using 'to'
                              title={link.name}
                              description={link.description}
                              icon={link.icon} // Passing icon component directly
                            />
                          ))}
                        </div>
                        {item.footer && (
                          <>
                            <DropdownMenuSeparator className="my-2" />
                            <div className="px-3 py-2 text-sm">
                              {item.footer.text}{' '}
                              <Link to={item.footer.linkTo} className="text-primary hover:underline font-normal"> {/* Using linkTo */}
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
              <Button variant="default" className="hover:animate-shake">
                Apply
              </Button>
              <AdminMenu />
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
                    <NavLink
                      key={item.name}
                      to={item.to} // Using 'to'
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
                          <NavLink
                            key={link.name}
                            to={link.to} // Using 'to'
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
                <Button variant="default" className="mt-2 hover:animate-shake" onClick={() => setIsSheetOpen(false)}>
                  Apply
                </Button>
                <AdminMenu className="mt-2" />
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
};

export default Navbar;