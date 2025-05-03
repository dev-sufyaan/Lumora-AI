// This script tests the connection to Supabase and checks if the appointments table exists
// Run with: node src/scripts/test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use environment variables instead of hardcoded credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase credentials in environment variables.');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data: healthData, error: healthError } = await supabase.rpc('pg_stat_statements_reset');
    
    if (healthError) {
      console.log('Connection test result: FAILED');
      console.error('Error:', healthError);
    } else {
      console.log('Connection test result: SUCCESS');
    }
    
    // Check if appointments table exists
    console.log('\nChecking if appointments table exists...');
    const { data, error } = await supabase
      .from('appointments')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.log('Table check result: FAILED');
      console.error('Error:', error);
      
      if (error.code === '42P01') {
        console.log('\nThe appointments table does not exist. Please run the SQL migration.');
      }
    } else {
      console.log('Table check result: SUCCESS');
      console.log(`Found ${data.count} appointments in the database.`);
    }
    
    // Test inserting a record
    console.log('\nTesting appointment insertion...');
    const testAppointment = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      date: '2025-05-10',
      time: '9-10',
      topic: 'test',
      created_at: new Date().toISOString()
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('appointments')
      .upsert(testAppointment)
      .select()
      .single();
    
    if (insertError) {
      console.log('Insert test result: FAILED');
      console.error('Error:', insertError);
    } else {
      console.log('Insert test result: SUCCESS');
      console.log('Inserted test appointment:', insertData);
      
      // Clean up test data
      await supabase
        .from('appointments')
        .delete()
        .eq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('Test data cleaned up.');
    }
    
  } catch (error) {
    console.error('Unexpected error during tests:', error);
  }
}

testConnection()
  .catch(err => console.error('Script error:', err))
  .finally(() => process.exit());
