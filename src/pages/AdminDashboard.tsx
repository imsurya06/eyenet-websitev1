"use client";

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader'; // Import the new AdminHeader

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <AdminHeader /> {/* Add the AdminHeader here */}
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default AdminDashboard;