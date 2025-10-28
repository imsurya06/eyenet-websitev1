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
import { Plus, ListChecks, LayoutGrid, Home, Newspaper, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminAddCourseDialog from './AdminAddCourseDialog';
import AdminAddImageDialog from './AdminAddImageDialog'; // Import the new dialog component

const dropdownItems = [
  // { name: 'Courses', href: '/admin-dashboard/courses', icon: ListChecks }, // This will now open the dialog
  // { name: 'Gallery', href: '/admin-dashboard/gallery', icon: LayoutGrid }, // This will now open the dialog
  { name: 'Infrastructure', href: '/admin-dashboard/infrastructure', icon: Home },
  { name: 'News', href: '/admin-dashboard/news-events', icon: Newspaper },
  { name: 'Blogs', href: '/admin-dashboard/blogs', icon: BookOpen },
];

const AdminAddDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = React.useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = React.useState(false); // New state for image dialog
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // Delay closing
  };

  const handleAddCourseClick = () => {
    setIsAddCourseDialogOpen(true);
    setIsDropdownOpen(false); // Close the dropdown when opening the dialog
  };

  const handleAddImageClick = () => { // New handler for image dialog
    setIsAddImageDialogOpen(true);
    setIsDropdownOpen(false); // Close the dropdown when opening the dialog
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90 px-6 py-3 text-text-regular rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] !text-white"
            onMouseEnter={handleOpenDropdown}
            onMouseLeave={handleCloseDropdown}
          >
            Add <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 p-1 bg-muted data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-300"
          align="end"
          sideOffset={10}
          alignOffset={-5}
          onMouseEnter={handleOpenDropdown}
          onMouseLeave={handleCloseDropdown}
        >
          {/* New "Courses" item to open the dialog */}
          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddCourseClick}
            >
              <ListChecks className="h-4 w-4" />
              <span>Courses</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

          {/* New "Gallery" item to open the dialog */}
          <DropdownMenuItem asChild className="cursor-pointer">
            <div
              className="flex items-center gap-2 px-2 py-2 text-text-regular font-body transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm"
              onClick={handleAddImageClick}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Gallery</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />

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
                  onClick={() => setIsDropdownOpen(false)}
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

      <AdminAddCourseDialog
        open={isAddCourseDialogOpen}
        onOpenChange={setIsAddCourseDialogOpen}
      />
      <AdminAddImageDialog
        open={isAddImageDialogOpen}
        onOpenChange={setIsAddImageDialogOpen}
      />
    </>
  );
};

export default AdminAddDropdown;