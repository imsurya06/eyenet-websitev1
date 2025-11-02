CREATE TABLE admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  program TEXT NOT NULL,
  terms BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add RLS policies for public insert access
-- Enable Row Level Security
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Policy for public insert access
CREATE POLICY "Allow public insert access" ON admissions
FOR INSERT WITH CHECK (true);