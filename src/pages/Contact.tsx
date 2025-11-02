"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AnimateOnScroll from '@/components/AnimateOnScroll'; // Import AnimateOnScroll
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
import { toast } from 'sonner'; // Import sonner for toasts
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

const Contact = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir//Suguna+store,+Hamdhiya+towers+2nd+floor,+80+feet+road,+Jn,+Anna+Nagar,+Madurai,+Tamil+Nadu+625020/@9.9291093,78.1409982,15.78z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b00c5072a46551f:0x3feb0d2a94af46bb!2m2!1d78.1485275!2d9.9215582?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: values.name,
            email: values.email,
            message: values.message,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase contact form submission error:", error);
        toast.error(`Message failed to send: ${error.message}`);
        return;
      }

      if (data && data.length > 0) {
        toast.success("Your message has been sent successfully!");
        form.reset(); // Reset form fields
      } else {
        toast.error("Message failed to send: No data received.");
      }
    } catch (err: any) {
      console.error("Unexpected contact form submission error:", err);
      toast.error(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-[80px] bg-background text-foreground min-h-[calc(100vh-12rem)] flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start w-full">
        {/* Left Section: Contact Form and Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll isHero={true} delay={500}>
            <p className="text-text-regular font-body text-foreground mb-2">Eyenet</p>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={600}>
            <h1 className="text-h1-mobile md:text-h1-desktop font-heading mb-4">
              Contact us
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll isHero={true} delay={700}>
            <p className="text-text-medium font-body text-gray-600 mb-10">
              We'd love to hear from you...!
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll isHero={true} delay={800} className="space-y-6 w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <FormLabel htmlFor="name" className="text-text-regular font-body text-foreground mb-2 block text-left">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder=""
                      {...form.register("name")}
                    />
                  </FormControl>
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </div>
                <div>
                  <FormLabel htmlFor="email" className="text-text-regular font-body text-foreground mb-2 block text-left">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder=""
                      {...form.register("email")}
                    />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                </div>
                <div>
                  <FormLabel htmlFor="message" className="text-text-regular font-body text-foreground mb-2 block text-left">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="Type your message..."
                      rows={6}
                      className="resize-none"
                      {...form.register("message")}
                    />
                  </FormControl>
                  <FormMessage>{form.formState.errors.message?.message}</FormMessage>
                </div>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="terms" className="text-text-regular font-body text-gray-600 text-left">
                          I accept the{' '}
                          <Link to="/terms-of-service" className="underline hover:text-primary">
                            Terms
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 px-6 py-2 text-text-regular bg-primary hover:bg-primary/90 text-primary-foreground">
                  Submit
                </Button>
              </form>
            </Form>
          </AnimateOnScroll>
        </div>

        {/* Right Section: Map Image */}
        <AnimateOnScroll isHero={true} delay={900} className="w-full h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-lg mx-auto lg:mx-0">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src="/images/madurai-map.png"
              alt="Map of Eye Net Educational Academy in Madurai"
              className="w-full h-full object-cover"
            />
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Contact;