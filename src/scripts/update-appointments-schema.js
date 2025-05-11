// This script updates the appointments table schema and adds appointments
// Run with: node src/scripts/update-appointments-schema.js

const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: '.env.local' });

// Use environment variables instead of hardcoded credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials in environment variables.');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function listAppointmentsWithStatus() {
  try {
    // Try to query appointments with status column
    const { data, error } = await supabase
      .from('appointments')
      .select('id, status')
      .limit(10);
    
    if (error) {
      console.error('Error querying appointments:', error);
      return false;
    }
    
    console.log('Existing appointments:', data);
    return true;
  } catch (err) {
    console.error('Error checking appointments table:', err);
    return false;
  }
}

async function insertTestAppointmentWithStatus() {
  try {
    // Check if we can insert an appointment with a status field
    const testAppointment = {
      id: randomUUID(),
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      date: '2025-01-01',
      time: '10-11',
      topic: 'product-demo',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(testAppointment)
      .select();
    
    if (error) {
      console.error('Error inserting test appointment:', error);
      return false;
    }
    
    console.log('Successfully inserted test appointment with status:', data);
    
    // Clean up the test appointment
    await supabase
      .from('appointments')
      .delete()
      .eq('id', testAppointment.id);
      
    console.log('Cleaned up test appointment');
    return true;
  } catch (err) {
    console.error('Error testing appointment insertion:', err);
    return false;
  }
}

async function updateExistingAppointments() {
  try {
    // Update all existing appointments to have 'pending' status if they don't already have one
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: 'pending' })
      .is('status', null)
      .select();
    
    if (error) {
      console.error('Error updating existing appointments:', error);
      return false;
    }
    
    console.log(`Updated ${data.length} existing appointments to have pending status`);
    return true;
  } catch (err) {
    console.error('Error updating existing appointments:', err);
    return false;
  }
}

async function createSampleAppointments() {
  try {
    // Create sample appointments
    const sampleAppointments = [
      {
        id: randomUUID(),
        name: 'John Smith',
        email: 'john@example.com',
        phone: '123-456-7890',
        date: '2025-01-15',
        time: '9-10',
        topic: 'integration',
        status: 'confirmed',
        created_at: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '987-654-3210',
        date: '2025-01-20',
        time: '14-15',
        topic: 'pricing',
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ];
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(sampleAppointments)
      .select();
    
    if (error) {
      console.error('Error creating sample appointments:', error);
      return false;
    }
    
    console.log('Successfully created sample appointments:', data);
    return true;
  } catch (err) {
    console.error('Error creating sample appointments:', err);
    return false;
  }
}

async function main() {
  console.log('Checking appointments table status column...');
  
  // First, check if we can access the status column
  const hasStatusColumn = await listAppointmentsWithStatus();
  
  if (hasStatusColumn) {
    console.log('Status column exists in appointments table');
    
    // Update any existing appointments without a status
    await updateExistingAppointments();
    
    // Ask if we should create sample appointments
    console.log('\nWould you like to create sample appointments for testing? (Y/n)');
    process.stdin.once('data', async (data) => {
      const input = data.toString().trim().toLowerCase();
      if (input === 'y' || input === 'yes' || input === '') {
        await createSampleAppointments();
      }
      process.exit(0);
    });
  } else {
    console.log('Testing if we can insert appointments with status...');
    const canInsertWithStatus = await insertTestAppointmentWithStatus();
    
    if (canInsertWithStatus) {
      console.log('Successfully verified status column works');
      // Update any existing appointments without a status
      await updateExistingAppointments();
      
      // Ask if we should create sample appointments
      console.log('\nWould you like to create sample appointments for testing? (Y/n)');
      process.stdin.once('data', async (data) => {
        const input = data.toString().trim().toLowerCase();
        if (input === 'y' || input === 'yes' || input === '') {
          await createSampleAppointments();
        }
        process.exit(0);
      });
    } else {
      console.log('Could not verify status column. You may need to modify the table schema manually.');
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
}); 