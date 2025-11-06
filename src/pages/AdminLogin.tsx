"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner'; // Using sonner for toasts
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

// Define the schema for the login form
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }), // Changed from username to email
  password: z.string().min(1, { message: 'Password is required.' }),
  // Removed mobile as it's not part of Supabase email/password auth
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        toast.error(`Login failed: ${error.message}`);
        return;
      }

      if (data.user) {
        toast.success("Login successful! Redirecting to admin dashboard...");
        // Store the user's email for display purposes (or a derived username)
        localStorage.setItem('adminUsername', data.user.email || 'Admin User');
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1500);
      } else {
        toast.error("Login failed: No user data received.");
      }
    } catch (err: any) {
      console.error("Unexpected login error:", err);
      toast.error(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] flex items-center justify-center"
      style={{ backgroundImage: 'url(/images/admin-login-background.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
      <AnimateOnScroll isHero={true} delay={500} className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white p-8 md:p-10 lg:p-12 rounded-lg shadow-xl text-center">
          <h1 className="text-h2-mobile md:text-h2-desktop font-heading mb-2 text-foreground">
            Admin
          </h1>
          <p className="text-text-medium font-body text-gray-600 mb-8">
            Login
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email" // Changed to email
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Email*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email" // Changed to email type
                        placeholder="admin@example.com"
                        className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Password*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-12 px-4 py-2 text-text-regular border border-input bg-muted focus-visible:ring-ring focus-visible:ring-offset-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 px-6 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out hover:scale-[1.02]">
                Login as Admin
              </Button>
            </form>
          </Form>
          <p className="text-text-small font-body text-gray-500 mt-6">
            Login only if you're an admin
          </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default AdminLogin;