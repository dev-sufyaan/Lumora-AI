// This script adds the status column to the appointments table in Supabase
// Run with: node src/scripts/add-status-to-appointments.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use environment variables instead of hardcoded credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in environment variables.');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addStatusToAppointmentsTable() {
  console.log('Adding status column to appointments table in Supabase...');
  
  try {
    // Directly attempt to add the status column
    // This SQL uses IF NOT EXISTS to avoid errors if the column already exists
    const { error } = await supabase.rpc('exec_sql', {
      query: `
        -- Add status column to appointments table if it doesn't exist
        ALTER TABLE IF EXISTS appointments 
        ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
        
        -- Create index for the status column
        CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
        
        -- Comment on the status column - will silently fail if column doesn't exist, which is fine
        COMMENT ON COLUMN IF EXISTS appointments.status IS 'Appointment status: pending, confirmed, closed';
      `
    });
    
    if (error) {
      console.error('Error adding status column to appointments table:', error);
    } else {
      console.log('Status column added to appointments table successfully!');
      
      // Verify the column exists by selecting a test record
      const { data, error: selectError } = await supabase
        .from('appointments')
        .select('id, status')
        .limit(1);
      
      if (selectError) {
        console.error('Error verifying status column:', selectError);
      } else if (data && data.length > 0) {
        console.log('Successfully verified status column exists:', data[0]);
      } else {
        console.log('Status column added, but no appointment records exist to verify');
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

addStatusToAppointmentsTable()
  .catch(err => console.error('Script error:', err))
  .finally(() => setTimeout(() => process.exit(), 1000)); // Small delay to ensure logs are printed 