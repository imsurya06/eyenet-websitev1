"use client";

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';
import AdminAddDropdown from './AdminAddDropdown'; // Import the new dropdown component

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
    <div className="sticky top-0 z-50 bg-background border-b border-border p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <AnimateOnScroll delay={100} className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-h3-mobile md:text-h3-desktop font-heading text-foreground mb-1">
          {username || 'Admin User'}
        </h2>
        <p className="text-text-regular font-body text-gray-600">
          Admin
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <AdminAddDropdown /> {/* Use the new dropdown component here */}
      </AnimateOnScroll>
    </div>
  );
};

export default AdminHeader;