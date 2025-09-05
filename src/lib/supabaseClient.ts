import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use demo/fallback values if environment variables are missing
const fallbackUrl = 'https://demo.supabase.co';
const fallbackKey = 'demo-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey, 
  {
  auth: {
    persistSession: true,
  },
});
