"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AnimateOnScroll from './AnimateOnScroll';
import StarRating from './StarRating'; // Import the new StarRating component
import { useTestimonials } from '@/context/TestimonialContext';
import { toast } from 'sonner';
import { Testimonial } from '@/context/TestimonialContext'; // Import Testimonial interface

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  rating: z.number().min(1, { message: 'Please provide a star rating.' }).max(5),
  quote: z.string().min(10, { message: 'Testimonial must be at least 10 characters.' }),
});

const StudentTestimonialForm = () => {
  const { addTestimonial } = useTestimonials();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      rating: 0,
      quote: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Explicitly cast values to ensure type compatibility, excluding 'approved' as it's set in context
      await addTestimonial(values as Omit<Testimonial, 'id' | 'created_at' | 'approved'>);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      // Error handling is already in context, but can add more specific here if needed
      console.error("Error submitting testimonial from component:", error);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-8 lg:px-[80px] bg-muted text-foreground">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll delay={100}>
          <h2 className="text-h2-mobile md:text-h2-desktop font-heading mb-4 text-center">
            Share Your Experience
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <p className="text-text-medium font-body text-gray-600 mb-10 text-center">
            We'd love to hear about your journey at Eyenet! Your feedback helps us grow.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-background p-8 rounded-lg shadow-md">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground">Your Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-regular font-body text-foreground">Your Rating:</FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onRatingChange={field.onChange}
                        className="justify-center md:justify-start"
                      />
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
                    <FormLabel className="text-text-regular font-body text-foreground">Your Testimonial:</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your experience here..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular">
                Submit Testimonial
              </Button>
            </form>
          </Form>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default StudentTestimonialForm;