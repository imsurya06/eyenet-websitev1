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
import AdminMenu from './AdminMenu';
import { cn } from '@/lib/utils';

const navItems = [
  { type: 'link', name: 'Home', to: '/' },
  { type: 'link', name: 'About', to: '/about' },
  { type: 'link', name: 'Admissions', to: '/admissions' },
  {
    type: 'dropdown',
    name: 'Courses',
    heading: 'courses',
    links: [
      { name: 'Fashion design Courses', description: 'Professional certification for creative professionals', to: '/courses/fashion-design', icon: LucideIcons.Tablet },
      { name: 'Computer courses', description: 'Digital and print design curriculum', to: '/courses/computer-courses', icon: LucideIcons.Laptop },
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkTo: '/admissions'
    }
  },
  {
    type: 'dropdown',
    name: 'Explore',
    heading: 'Explore',
    links: [
      { name: 'Students Zone', description: 'Discover student life and resources', to: '/explore/students-zone', icon: LucideIcons.PersonStanding },
      { name: 'Infrastructure', description: 'Explore our facilities and campus', to: '/explore/infrastructure', icon: LucideIcons.Home },
      { name: 'Gallery', description: 'View our creative works and events', to: '/explore/gallery', icon: LucideIcons.LayoutGrid },
      { name: 'News & Events', description: 'Stay updated with the latest happenings', to: '/explore/news-events', icon: LucideIcons.CalendarDays },
      { name: 'Our Services', description: 'Specialized training and additional services', to: '/our-services', icon: LucideIcons.Briefcase }, // New 'Our Services' link
    ],
    footer: {
      text: 'Start your design journey',
      linkText: 'Apply now',
      linkTo: '/admissions'
    }
  },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Determine if a dropdown's sub-links are active
  const isDropdownPathActive = (links: { to: string }[]) => {
    return links.some(link => location.pathname.startsWith(link.to));
  };

  const coursesItem = navItems.find(item => item.name === 'Courses' && item.type === 'dropdown');
  const isCoursesPathActive = coursesItem ? isDropdownPathActive(coursesItem.links) : false;

  const exploreItem = navItems.find(item => item.name === 'Explore' && item.type === 'dropdown');
  const isExplorePathActive = exploreItem ? isDropdownPathActive(exploreItem.links) : false;

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground shadow-lg py-2 md:py-3">
      <div className="flex h-auto items-center justify-between px-3 md:px-8 lg:px-[80px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-12 md:h-[60px] lg:h-[72px] w-auto object-contain" /> {/* Adjusted logo size */}
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
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "text-text-regular font-normal transition-colors hover:text-primary px-4 py-2 rounded-md",
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
                      onOpenChange={item.name === 'Courses' ? setCoursesOpen : setExploreOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "font-normal transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-4 py-2",
                            "text-text-regular",
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
                              to={link.to}
                              title={link.name}
                              description={link.description}
                              icon={link.icon}
                            />
                          ))}
                        </div>
                        {item.footer && (
                          <>
                            <DropdownMenuSeparator className="my-2" />
                            <div className="px-3 py-2 text-text-tiny">
                              {item.footer.text}{' '}
                              <Link to={item.footer.linkTo} className="text-primary hover:underline font-normal">
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
              <Button variant="default" asChild className="hover:animate-shake">
                <Link to="/admissions">Apply</Link>
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
              {/* Logo inside the SheetContent */}
              <div className="flex items-center justify-center py-4 border-b border-border mb-4 bg-white">
                <Link to="/" onClick={() => setIsSheetOpen(false)} className="flex justify-center">
                  <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-[60px] w-auto object-contain" /> {/* Adjusted logo size for mobile sheet */}
                </Link>
              </div>
              <nav className="flex flex-col gap-4 pt-6">
                {navItems.map((item) => (
                  item.type === 'link' ? (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "text-text-regular font-normal hover:text-primary",
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
                          "text-text-regular font-normal",
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
                            to={link.to}
                            onClick={() => setIsSheetOpen(false)}
                            className={({ isActive }) =>
                              cn(
                                "text-text-small hover:text-primary",
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
                <Button variant="default" asChild className="mt-2 hover:animate-shake">
                  <Link to="/admissions" onClick={() => setIsSheetOpen(false)}>Apply</Link>
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