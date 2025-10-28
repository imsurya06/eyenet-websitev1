"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';

interface AdminHeaderProps {
  pageTitle: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ pageTitle }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('adminUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="bg-background border-b border-border p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <AnimateOnScroll delay={100} className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-h3-mobile md:text-h3-desktop font-heading text-foreground mb-1">
          {username || 'Admin User'}
        </h2>
        <p className="text-text-regular font-body text-gray-600">
          Admin
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <Button className="bg-primary hover:bg-primary/90 px-6 py-3 text-text-regular rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] !text-white">
          Add <Plus className="ml-2 h-4 w-4" />
        </Button>
      </AnimateOnScroll>
    </div>
  );
};

export default AdminHeader;