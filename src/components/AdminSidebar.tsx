"use client";

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ListChecks, Image, Home, Newspaper, BookOpen, MessageSquareText, Users } from 'lucide-react'; // Import Users icon

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const sidebarNavItems: SidebarLink[] = [
  { name: 'Courses', href: '/admin-dashboard/courses', icon: ListChecks },
  { name: 'Image Gallery', href: '/admin-dashboard/gallery', icon: Image },
  { name: 'Infrastructure', href: '/admin-dashboard/infrastructure', icon: Home },
  { name: 'News & Events', href: '/admin-dashboard/news-events', icon: Newspaper },
  { name: 'Blogs', href: '/admin-dashboard/blogs', icon: BookOpen },
  { name: 'Testimonials', href: '/admin-dashboard/testimonials', icon: MessageSquareText },
  { name: 'Faculty', href: '/admin-dashboard/faculty', icon: Users }, // New Faculty link
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 w-64 bg-background border-r border-border h-screen flex flex-col shadow-lg z-40"> {/* Added fixed, left-0, top-0, and z-40 */}
      {/* Logo */}
      <div className="p-6 border-b border-border flex justify-center">
        <Link to="/">
          <img src="/design-system/eyenet png.png" alt="Eyenet Logo" className="h-10" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 p-3 rounded-md text-text-regular font-body transition-colors",
                "hover:bg-muted hover:text-primary",
                isActive ? "bg-muted text-primary font-semibold" : "text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-primary-foreground bg-primary rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Go to Homepage Button */}
      <div className="p-4 border-t border-border">
        <Button asChild className="w-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <Link to="/">
            Go to Homepage <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;