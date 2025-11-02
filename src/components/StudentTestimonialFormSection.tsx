"use client";

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useTestimonials } from '@/context/TestimonialContext';
import { toast } from 'sonner';
import { Testimonial } from '@/data/testimonials';
import StarRating from './StarRating';
import { format } from 'date-fns';
import AnimateOnScroll from './AnimateOnScroll';

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Your name must be at least 2 characters.' }),
  quote: z.string().min(20, { message: 'Testimonial must be at least 20 characters.' }),
  rating: z.number().min(1, { message: 'Please provide a rating.' }).max(5, { message: 'Rating must be between 1 and 5.' }),
});

const StudentTestimonialFormSection: React.FC = () => {
  const { addTestimonial } = useTestimonials();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      quote: '',
      rating: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const testimonialToSave: Testimonial = {
      id: `student-test-${Date.now()}`,
      name: values.name,
      quote: values.quote,
      rating: values.rating,
      approved: false, // New testimonials are not approved by default
      date: format(new Date(), 'yyyy-MM-dd'),
      avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(values.name)}`, // Generate avatar
    };

    await addTestimonial(testimonialToSave);
    toast.success("Testimonial submitted for review!");
    form.reset({
      name: '',
      quote: '',
      rating: 0,
    });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-muted text-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4">
            Share Your Experience
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-10">
            We'd love to hear about your journey at Eyenet. Your feedback helps us grow!
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground text-left">Your Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground text-left">Your Testimonial:</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your honest feedback here..." rows={6} {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between"> {/* Added flex classes here */}
                    <FormLabel className="text-text-regular font-body text-foreground">Your Rating:</FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onRatingChange={field.onChange}
                        editable
                        size={28}
                        className="justify-end" {/* Adjusted justify for stars */}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular mt-4">
                Submit Testimonial
              </Button>
            </form>
          </Form>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default StudentTestimonialFormSection;