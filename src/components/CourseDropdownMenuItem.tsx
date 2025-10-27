"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface CourseDropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  href: string;
  title: string;
  description?: string;
  icon?: keyof typeof LucideIcons;
}

const CourseDropdownMenuItem = React.forwardRef<
  HTMLAnchorElement,
  CourseDropdownMenuItemProps
>(({ className, title, children, href, description, icon, ...props }, ref) => {
  const IconComponent = icon ? LucideIcons[icon] : null;

  return (
    <DropdownMenuItem asChild>
      <Link
        ref={ref}
        to={href}
        className={cn(
          "flex items-start gap-3 rounded-md p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        {IconComponent ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconComponent className="h-5 w-5" />
          </div>
        ) : (
          // Fallback for when IconComponent is not found
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-500 text-white">
            ?
          </div>
        )}
        <div className="flex flex-col justify-center h-[3.5rem]"> {/* Changed to flexbox for vertical centering */}
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description || '\u00A0'} {/* Always render, use non-breaking space if no description */}
          </p>
          {children}
        </div>
      </Link>
    </DropdownMenuItem>
  );
});
CourseDropdownMenuItem.displayName = "CourseDropdownMenuItem";

export default CourseDropdownMenuItem;