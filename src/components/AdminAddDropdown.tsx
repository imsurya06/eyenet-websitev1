"use client";

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Plus, ListChecks, LayoutGrid, Home, Newspaper, BookOpen } from 'lucide-react'; // Changed Image to Home
import { cn } from '@/lib/utils';

const dropdownItems = [
  { name: 'Courses', href: '/admin-dashboard/courses', icon: ListChecks },
  { name: 'Gallery', href: '/admin-dashboard/gallery', icon: LayoutGrid },
  { name: 'Infrastructure', href: '/admin-dashboard/infrastructure', icon: Home }, // Changed name, href, and icon
  { name: 'News', href: '/admin-dashboard/news-events', icon: Newspaper },
  { name: 'Blogs', href: '/admin-dashboard/blogs', icon: BookOpen },
];

const AdminAddDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Delay closing
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-primary hover:bg-primary/90 px-6 py-3 text-text-regular rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] !text-white"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          Add <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 p-1 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
        align="end"
        sideOffset={10}
        alignOffset={-5}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        {dropdownItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <DropdownMenuItem asChild className="cursor-pointer">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm",
                    isActive && "text-primary"
                  )
                }
                onClick={() => setIsOpen(false)} // Close dropdown on click
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            </DropdownMenuItem>
            {index < dropdownItems.length - 1 && <DropdownMenuSeparator className="my-1" />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminAddDropdown;