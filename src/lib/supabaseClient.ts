import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic URL validation
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

if (!supabaseUrl || !isValidUrl(supabaseUrl)) {
  console.error('Supabase URL is missing or invalid. Please ensure VITE_SUPABASE_URL is a valid HTTP/HTTPS URL in your .env.local file.');
  // You might want to throw an error or handle this more gracefully in a production app
  throw new Error('Invalid Supabase URL configuration.');
}

if (!supabaseKey) {
  console.error('Supabase Key is missing. Please ensure VITE_SUPABASE_ANON_KEY is set in your .env.local file.');
  // You might want to throw an error or handle this more gracefully in a production app
  throw new Error('Invalid Supabase Key configuration.');
}

// Add these console logs to verify the values
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key (first 10 chars):', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'N/A');

export const supabase = createClient(supabaseUrl, supabaseKey);