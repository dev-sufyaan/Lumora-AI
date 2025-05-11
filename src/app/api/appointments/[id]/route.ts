import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// DELETE /api/appointments/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing appointment ID' },
        { status: 400 }
      );
    }
    
    // Use the service client with elevated privileges (only available server-side)
    const serviceClient = createServiceClient();
    
    // Delete the appointment from the database
    const { error } = await serviceClient
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', {
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

    // Return success
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unexpected error in delete appointment API:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PATCH /api/appointments/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing appointment ID' },
        { status: 400 }
      );
    }
    
    // Parse the request body
    const { status } = await request.json();
    
    if (!status) {
      return NextResponse.json(
        { error: 'Missing status in request body' },
        { status: 400 }
      );
    }
    
    // Validate status
    if (!['pending', 'confirmed', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, closed' },
        { status: 400 }
      );
    }
    
    // Use the service client with elevated privileges (only available server-side)
    const serviceClient = createServiceClient();
    
    try {
      // First check if the database has the status column
      await serviceClient
        .from('appointments')
        .select('status')
        .limit(1);
    } catch (err: any) {
      // If this error indicates a missing status column
      if (err.message?.includes('status') || err.code === '42703') {
        return NextResponse.json(
          { error: 'Database schema error: status column is missing. Run database schema verification.' },
          { status: 500 }
        );
      }
    }
    
    // Update the appointment status
    const { data, error } = await serviceClient
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating appointment status:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // Check if this is a schema error
      if (error.message?.includes('status') || error.code === '42703') {
        return NextResponse.json(
          { error: 'Database schema error: status column is missing. Run database schema verification.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Return the updated appointment
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error in update appointment status API:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// GET /api/appointments/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing appointment ID' },
        { status: 400 }
      );
    }
    
    // Use the service client with elevated privileges (only available server-side)
    const serviceClient = createServiceClient();
    
    // Get the appointment by ID
    const { data, error } = await serviceClient
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return NextResponse.json(
          { error: 'Appointment not found' },
          { status: 404 }
        );
      }
      
      console.error('Error fetching appointment:', {
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

    // Return the appointment
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error in get appointment API:', error);
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 