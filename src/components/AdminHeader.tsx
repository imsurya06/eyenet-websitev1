"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminHeader = () => {
  const { adminUsername } = useAuth();

  return (
    <header className="flex items-center justify-between p-6 border-b border-border bg-background">
      <div className="flex flex-col">
        <h1 className="text-h3-mobile md:text-h3-desktop font-heading text-foreground">
          {adminUsername || 'Admin'}
        </h1>
        <p className="text-text-regular font-body text-gray-600">Admin</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-text-regular rounded-full shadow-md">
        Add <Plus className="ml-2 h-4 w-4" />
      </Button>
    </header>
  );
};

export default AdminHeader;