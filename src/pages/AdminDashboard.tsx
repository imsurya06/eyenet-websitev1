"use client";

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto ml-64"> {/* Added ml-64 to push content past the fixed sidebar */}
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default AdminDashboard;