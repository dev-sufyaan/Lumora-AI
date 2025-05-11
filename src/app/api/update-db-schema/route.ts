import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Use the service client with elevated privileges (only available server-side)
    const serviceClient = createServiceClient();
    
    // Try to add the status column using SQL
    const { error: alterError } = await serviceClient.rpc('pg_query', {
      query: `
        ALTER TABLE appointments 
        ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
        
        CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
      `
    });

    if (alterError) {
      console.error('Error adding status column:', alterError);
      
      // If the rpc pg_query is not available, try direct query
      const { error: alterError2 } = await serviceClient.from('appointments').select();
      
      if (alterError2?.message?.includes('status') || alterError2?.message?.includes('column') || alterError2?.code === '42703') {
        // This is expected since we're checking if the column exists
        return NextResponse.json({
          message: 'The status column does not exist. Manual schema update required in Supabase dashboard.',
          error: alterError
        });
      } else {
        return NextResponse.json({
          message: 'Error checking status column',
          error: alterError2
        }, { status: 500 });
      }
    }
    
    // Verify that the column was added by checking a record
    const { data, error: selectError } = await serviceClient
      .from('appointments')
      .select('id, status')
      .limit(1);
    
    if (selectError) {
      // The column probably wasn't added successfully
      return NextResponse.json({
        message: 'Error verifying status column: ' + selectError.message,
        success: false
      }, { status: 500 });
    }
    
    // Success! Return a message and a sample of data
    return NextResponse.json({
      message: 'Status column is available in the appointments table',
      data,
      success: true
    });
  } catch (error: any) {
    console.error('Unexpected error in update-db-schema:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 