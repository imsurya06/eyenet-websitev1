CREATE TABLE news_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  image TEXT
);

-- Optional: Add RLS policies for public read and authenticated write
-- Enable Row Level Security
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Allow public read access" ON news_events
FOR SELECT USING (true);

-- Policy for authenticated users to insert, update, and delete their own news_events
CREATE POLICY "Allow authenticated users to manage news_events" ON news_events
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');