-- Enable RLS on the testimonials table if it's not already enabled
    ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

    -- Create a policy to allow anonymous users to insert new testimonials
    CREATE POLICY "Allow anon insert for testimonials"
    ON public.testimonials FOR INSERT
    TO anon
    WITH CHECK (true);