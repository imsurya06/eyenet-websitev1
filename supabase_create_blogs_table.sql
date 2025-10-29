CREATE TABLE public.blogs (
  id text PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  content text NOT NULL,
  image text
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.blogs
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.blogs
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON public.blogs
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
ON public.blogs
FOR DELETE
TO authenticated
USING (true);