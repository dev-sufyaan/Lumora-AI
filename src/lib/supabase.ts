import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables with fallbacks for local development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yfhbwbwrktgfpczmqoo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaGJ3Yndya3RnZnBjemZtcW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODE2MTgsImV4cCI6MjA2MTg1NzYxOH0.qXEWf3hE9Vfyaq-acDMMWpOoqE7HQqqBnaEjcCZuNqM';

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
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaGJ3Yndya3RnZnBjemZtcW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjI4MTYxOCwiZXhwIjoyMDYxODU3NjE4fQ.GQjMBuddwI2rsogFGF6SuCop8QYjsrPLdwYvFLyGc7s';
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false
    }
  });
};
