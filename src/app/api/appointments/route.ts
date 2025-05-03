import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { AppointmentInsert } from '@/services/appointmentService';

// This is a server-side API route, so it has access to all environment variables
// including SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request) {
  try {
    // Parse the request body
    const appointment: AppointmentInsert = await request.json();
    
    // Validate the appointment data
    if (!appointment.name || !appointment.email || !appointment.phone || 
        !appointment.date || !appointment.time || !appointment.topic) {
      return NextResponse.json(
        { error: 'Missing required fields for appointment creation' },
        { status: 400 }
      );
    }

    // Use the service client with elevated privileges (only available server-side)
    const serviceClient = createServiceClient();
    
    // Insert the appointment into the database
    const { data, error } = await serviceClient
      .from('appointments')
      .insert(appointment)
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Return the created appointment
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error in appointments API:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
