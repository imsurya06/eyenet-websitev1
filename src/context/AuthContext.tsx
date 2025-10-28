"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  adminUsername: string | null;
  setAdminUsername: (username: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUsername, setAdminUsernameState] = useState<string | null>(() => {
    // Initialize from localStorage to persist login across refreshes
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminUsername');
    }
    return null;
  });

  const setAdminUsername = (username: string | null) => {
    setAdminUsernameState(username);
    if (typeof window !== 'undefined') {
      if (username) {
        localStorage.setItem('adminUsername', username);
      } else {
        localStorage.removeItem('adminUsername');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ adminUsername, setAdminUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};