// This script creates the appointments table in Supabase
// Run with: node src/scripts/create-supabase-table.js

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

async function createAppointmentsTable() {
  console.log('Creating appointments table in Supabase...');
  
  // Check if table exists first
  const { data: existingTables, error: listError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', 'appointments');
  
  if (listError) {
    console.error('Error checking if table exists:', listError);
    return;
  }
  
  if (existingTables && existingTables.length > 0) {
    console.log('Appointments table already exists.');
    return;
  }
  
  // Create the table using SQL
  const { error } = await supabase.rpc('exec_sql', {
    query: `
      CREATE TABLE appointments (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        topic TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create indexes for better performance
      CREATE INDEX idx_appointments_email ON appointments(email);
      CREATE INDEX idx_appointments_date ON appointments(date);
      CREATE INDEX idx_appointments_created_at ON appointments(created_at);
    `
  });
  
  if (error) {
    console.error('Error creating appointments table:', error);
  } else {
    console.log('Appointments table created successfully!');
  }
}

createAppointmentsTable()
  .catch(err => console.error('Script error:', err))
  .finally(() => process.exit());
