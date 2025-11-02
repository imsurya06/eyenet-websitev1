CREATE TABLE public.admissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    mobile text NOT NULL,
    program text NOT NULL,
    terms_accepted boolean DEFAULT FALSE,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) users to insert new admission records
CREATE POLICY "Admissions can be inserted by public users."
ON public.admissions FOR INSERT
TO public
WITH CHECK (true);

-- Admissions are viewable by authenticated users (no change here)
CREATE POLICY "Admissions are viewable by authenticated users."
ON public.admissions FOR SELECT
TO authenticated
USING (true);