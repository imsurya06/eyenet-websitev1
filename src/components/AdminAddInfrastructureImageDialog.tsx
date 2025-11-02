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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { useInfrastructureImages } from '@/context/InfrastructureImageContext';
import { toast } from 'sonner';
import { InfrastructureImage } from '@/data/infrastructureImages';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

interface AdminAddInfrastructureImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingImage: InfrastructureImage | null; // New prop for editing
  onSave: (image: InfrastructureImage) => void; // New prop for saving (add or update)
}

// Zod schema for form validation
const formSchema = z.object({
  imageAlt: z.string().min(2, { message: 'Image Alt Text must be at least 2 characters.' }),
  imageCategory: z.enum(['lab', 'classroom', 'library', 'campus', 'other'], { message: 'Please select an image category.' }),
  imageFile: z.any().optional(), // File object is optional for editing
});

const AdminAddInfrastructureImageDialog: React.FC<AdminAddInfrastructureImageDialogProps> = ({ open, onOpenChange, editingImage, onSave }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageAlt: '',
      imageCategory: undefined,
      imageFile: undefined,
    },
  });

  useEffect(() => {
    if (open && editingImage) {
      // Pre-fill form fields when editing an existing image
      form.reset({
        imageAlt: editingImage.alt,
        imageCategory: editingImage.category,
        imageFile: undefined, // Files cannot be pre-filled for security reasons
      });
      setImagePreview(editingImage.src !== '/public/placeholder.svg' ? editingImage.src : null);
    } else if (open && !editingImage) {
      // Reset form for adding a new image
      form.reset({
        imageAlt: '',
        imageCategory: undefined,
        imageFile: undefined,
      });
      setImagePreview(null);
    }
  }, [open, editingImage, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('imageFile', file);
      form.clearErrors('imageFile'); // Clear error when a file is selected
    } else {
      setImagePreview(null);
      form.setValue('imageFile', undefined);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = editingImage?.src || '/public/placeholder.svg';

    // Upload image file if a new one is selected
    if (values.imageFile) {
      const file = values.imageFile;
      const filePath = `images/${Date.now()}-${file.name}`;
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

    const imageToSave: InfrastructureImage = {
      id: editingImage?.id || `infra-image-${Date.now()}`,
      src: imageUrl,
      alt: values.imageAlt,
      category: values.imageCategory,
    };

    onSave(imageToSave); // Call the onSave prop
    toast.success(`${editingImage ? 'Image updated' : 'Image added'} to infrastructure!`);
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-h4-mobile md:text-h4-desktop font-heading text-foreground">
            {editingImage ? 'Edit Infrastructure Image' : 'Upload Infrastructure Image'}
          </DialogTitle>
          <DialogDescription className="text-text-regular font-body text-gray-600">
            {editingImage ? 'Update the details of this infrastructure image.' : 'Fill in the details to add a new image to the infrastructure gallery.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-regular font-body text-foreground">Image Alt Text:</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Lab" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageCategory"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-text-regular font-body text-foreground">Image Category:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="lab" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Lab
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="classroom" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Classroom
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="library" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Library
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="campus" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Campus
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal text-text-regular font-body text-foreground">
                          Other
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-text-regular font-body text-foreground">Image File:</FormLabel>
              <FormControl>
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border border-input bg-muted rounded-md cursor-pointer hover:bg-accent transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover object-center rounded-md" />
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
                {editingImage ? 'Save Changes' : 'Add Image'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddInfrastructureImageDialog;