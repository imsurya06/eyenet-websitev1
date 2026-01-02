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
import { Filter, Image, HardDrive, ListChecks, MoreHorizontal } from 'lucide-react'; // Added MoreHorizontal for 'Other Courses'
import { cn } from '@/lib/utils';

const filterItems = [
  { name: 'All Courses', href: '/admin-dashboard/courses', icon: ListChecks }, // New 'All Courses' option
  { name: 'Fashion designing', href: '/admin-dashboard/courses?category=fashion', icon: Image },
  { name: 'Computer course', href: '/admin-dashboard/courses?category=computer', icon: HardDrive },
  { name: 'Other Courses', href: '/admin-dashboard/courses?category=other', icon: MoreHorizontal }, // New 'Other Courses' option
];

const AdminCourseFilter = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // Removed closeTimeoutRef and handleOpen/handleClose functions as they were for hover.

  return (
    <div className="bg-background border-b border-border p-6 md:p-8 lg:p-10 flex items-center justify-between">
      <h3 className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
        Our Courses
      </h3>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}> {/* Open/close on click */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="px-4 py-2 text-text-regular border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            // Removed onMouseEnter and onMouseLeave
          >
            Filter <Filter className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 p-1 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
          align="end"
          sideOffset={10}
          alignOffset={-5}
          // Removed onMouseEnter and onMouseLeave
        >
          {filterItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <DropdownMenuItem asChild className="cursor-pointer">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm",
                      isActive && "text-primary"
                    )
                  }
                  onClick={() => setIsOpen(false)} // Close dropdown on click
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              </DropdownMenuItem>
              {index < filterItems.length - 1 && <DropdownMenuSeparator className="my-1" />}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminCourseFilter;