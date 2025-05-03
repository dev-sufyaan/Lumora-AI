import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables. Throw an error if they are missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create a single supabase client for interacting with your database
// Simplified configuration to avoid potential issues
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  }
});

// For server-side operations that require elevated privileges
export const createServiceClient = () => {
  // This should only be used in server-side contexts
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false
    }
  });
};
