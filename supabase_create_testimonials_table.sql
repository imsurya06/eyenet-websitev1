CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE, -- Added approved column
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated'); -- Added update policy
CREATE POLICY "Allow authenticated delete access" ON testimonials FOR DELETE USING (auth.role() = 'authenticated'); -- Added delete policy