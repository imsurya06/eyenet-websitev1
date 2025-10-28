"use client";

import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react'; // Keep this import for reference if needed elsewhere, but direct component passing is better

interface CourseDropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof NavLink> {
  to: string; // Changed from href to to
  title: string;
  description?: string;
  icon?: React.ElementType; // Changed type to React.ElementType
}

const CourseDropdownMenuItem = React.forwardRef<
  HTMLAnchorElement,
  CourseDropdownMenuItemProps
>(({ className, title, to, description, icon: IconComponent, ...props }, ref) => { // Destructured 'to' and renamed 'icon' to 'IconComponent'
  return (
    <DropdownMenuItem asChild>
      <NavLink
        ref={ref}
        to={to} // Using 'to' directly
        className={({ isActive }) =>
          cn(
            "flex items-start gap-3 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isActive && "text-primary",
            className
          )
        }
        {...props}
      >
        {IconComponent ? ( // Render IconComponent if it exists
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconComponent className="h-5 w-5" />
          </div>
        ) : (
          // Fallback for when IconComponent is not provided
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-500 text-white">
            ?
          </div>
        )}
        <div className="flex flex-col justify-center h-[3.5rem]">
          <p className="text-sm font-normal leading-none">{title}</p>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description || '\u00A0'}
          </p>
        </div>
      </NavLink>
    </DropdownMenuItem>
  );
});
CourseDropdownMenuItem.displayName = "CourseDropdownMenuItem";

export default CourseDropdownMenuItem;