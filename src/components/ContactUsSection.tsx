"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import AnimateOnScroll from './AnimateOnScroll';
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
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client
import { toast } from 'sonner'; // Import toast for notifications

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

const ContactUsSection = () => {
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
        .from('contact_submissions')
        .insert([
          {
            name: values.name,
            email: values.email,
            message: values.message,
            terms_accepted: values.terms,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase submission error:', error);
        toast.error(`Submission failed: ${error.message}`);
        return;
      }

      if (data && data.length > 0) {
        toast.success('Your message has been sent successfully!');
        form.reset(); // Reset form fields
      } else {
        toast.error('Submission failed: No data received.');
      }
    } catch (err: any) {
      console.error('Unexpected submission error:', err);
      toast.error(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-background text-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Section: Contact Information */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimateOnScroll delay={100}>
            <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
              Contact us
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="text-text-medium font-body text-gray-600 mb-10 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </AnimateOnScroll>

          <div className="space-y-6 w-full flex flex-col items-center lg:items-start">
            <AnimateOnScroll delay={300}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:email@example.com" className="text-text-regular font-body text-foreground hover:underline">
                  email@example.com
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={400}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+15550000000" className="text-text-regular font-body text-foreground hover:underline">
                  +1 (555) 000-0000
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={500}>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <MapPin className="h-6 w-6 text-primary" />
                <p className="text-text-regular font-body text-foreground">
                  123 Sample St, Sydney NSW 2000 AU
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <AnimateOnScroll delay={600} className="w-full max-w-lg mx-auto lg:mx-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground mb-2 block text-left">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Type your message..."
                        rows={6}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="text-text-regular font-body text-gray-600">
                        I accept the{' '}
                        <Link to="/terms-of-service" className="underline hover:text-primary">
                          Terms
                        </Link>
                      </Label>
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
    </section>
  );
};

export default ContactUsSection;