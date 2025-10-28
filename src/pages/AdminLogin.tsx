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

// Define the schema for the login form
const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  mobile: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be 10 digits.' }),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      mobile: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // --- IMPORTANT: This is client-side authorization for demonstration purposes ONLY. ---
    // --- In a real application, this logic MUST be handled securely on a backend server. ---
    const ADMIN_USERNAME = "eyenet-fs@25";
    const ADMIN_PASSWORD = "06072004";
    const ADMIN_MOBILE = "8754255020";

    if (
      values.username === ADMIN_USERNAME &&
      values.password === ADMIN_PASSWORD &&
      values.mobile === ADMIN_MOBILE
    ) {
      toast.success("Login successful! Redirecting to admin dashboard...");
      // Simulate successful login and redirect
      // In a real app, you'd set a token/session here
      setTimeout(() => {
        navigate('/admin-dashboard'); // Redirect to the new admin dashboard
      }, 1500);
    } else {
      toast.error("Invalid credentials. Please try again.");
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Username*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder=""
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
                        placeholder=""
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
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Mobile Number*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder=""
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