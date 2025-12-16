"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus } from 'lucide-react';
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
import { useFaculty } from '@/context/FacultyContext';
import { toast } from 'sonner';
import { Faculty } from '@/data/faculty';
import { supabase } from '@/lib/supabaseClient';

interface AdminAddFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingFaculty: Faculty | null;
  onSave: (faculty: Omit<Faculty, 'created_at'>) => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  qualification: z.string().min(5, { message: 'Qualification must be at least 5 characters.' }),
  achievements: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageFile: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024), 'Image size must be less than 10MB.')
    .optional(),
});

const AdminAddFacultyDialog: React.FC<AdminAddFacultyDialogProps> = ({ open, onOpenChange, editingFaculty, onSave }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      qualification: '',
      achievements: '',
      description: '',
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (open && editingFaculty) {
      form.reset({
        name: editingFaculty.name,
        qualification: editingFaculty.qualification,
        achievements: editingFaculty.achievements || '',
        description: editingFaculty.description,
        imageFile: undefined,
      });
      setImagePreview(editingFaculty.image || null);
    } else if (open && !editingFaculty) {
      form.reset({
        name: '',
        qualification: '',
        achievements: '',
        description: '',
        imageFile: undefined,
      });
      setImagePreview(null);
    }
  }, [open, editingFaculty, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('imageFile', file);
      form.clearErrors('imageFile');
    } else {
      setImagePreview(null);
      form.setValue('imageFile', undefined);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = editingFaculty?.image || '/public/placeholder.svg';

    if (values.imageFile) {
      const file = values.imageFile;
      const filePath = `faculty_images/${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage.from('images').upload(filePath, file);
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } catch (error: any) {
        toast.error(`Failed to upload image: ${error.message}`);
        return;
      }
    }

    const facultyToSave: Omit<Faculty, 'created_at'> = {
      id: editingFaculty?.id || `faculty-${Date.now()}`,
      name: values.name,
      image: imageUrl,
      qualification: values.qualification,
      achievements: values.achievements || undefined,
      description: values.description,
    };

    onSave(facultyToSave);
    toast.success(`${editingFaculty ? 'Faculty updated' : 'Faculty added'} successfully!`);
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            {editingFaculty ? 'Update the details of this faculty member.' : 'Fill in the details to add a new faculty member.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Faculty Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Qualification:</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ph.D. in Fashion Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Achievements (Optional):</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Awarded 'Best Educator' 2023" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Description:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the faculty member's expertise and background." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Image:</FormLabel>
              <FormControl>
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Faculty Preview" className="h-full w-full object-contain rounded-md" />
                  ) : (
                    <>
                      <ImagePlus className="h-8 w-8 mb-2 text-gray-500" />
                      <span className="text-text-regular font-body text-gray-600">Upload image</span>
                    </>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Label>
              </FormControl>
              {form.formState.errors.imageFile && <FormMessage>{form.formState.errors.imageFile.message?.toString()}</FormMessage>}
            </FormItem>

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 !text-white text-text-regular">
                {editingFaculty ? 'Save Changes' : 'Add Faculty Member'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddFacultyDialog;