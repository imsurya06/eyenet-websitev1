CREATE TABLE public.contact_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    terms_accepted boolean DEFAULT FALSE,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous) users to insert new contact submissions
CREATE POLICY "Contact submissions can be inserted by public users."
ON public.contact_submissions FOR INSERT
TO public
WITH CHECK (true);

-- Contact submissions are viewable by authenticated users (no change here)
CREATE POLICY "Contact submissions are viewable by authenticated users."
ON public.contact_submissions FOR SELECT
TO authenticated
USING (true);