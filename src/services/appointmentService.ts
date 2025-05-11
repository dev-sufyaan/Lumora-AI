import { supabase, createServiceClient } from '@/lib/supabase';
import { Database } from '@/types/supabase';

export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];

/**
 * Get all appointments from the database
 */
export async function getAllAppointments(): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllAppointments:', error);
    return [];
  }
}

/**
 * Create a new appointment in the database
 */
export async function createAppointment(appointment: AppointmentInsert): Promise<Appointment> {
  // Instead of directly using the service client, make a POST request to our API
  try {
    // Ensure required fields are present (basic validation)
    if (!appointment.name || !appointment.email || !appointment.phone || !appointment.date || !appointment.time || !appointment.topic) {
      console.error('Missing required appointment fields:', appointment);
      throw new Error('Missing required fields for appointment creation.');
    }

    // Make a POST request to our API endpoint
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating appointment:', errorData);
      throw new Error(errorData.message || 'Failed to create appointment');
    }

    return await response.json();
  } catch (error: any) {
    // Provide more detailed error information
    console.error('Error in createAppointment:', {
      error,
      appointment
    });
    throw error;
  }
}

/**
 * Delete an appointment by ID
 */
export async function deleteAppointment(id: string): Promise<void> {
  try {
    // Use API route instead of direct Supabase access for better security
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting appointment:', errorData);
      throw new Error(errorData.error || 'Failed to delete appointment');
    }
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    throw error;
  }
}

/**
 * Get an appointment by ID
 */
export async function getAppointmentById(id: string): Promise<Appointment | null> {
  try {
    // Use API route instead of direct Supabase access for better security
    const response = await fetch(`/api/appointments/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      console.error('Error fetching appointment:', errorData);
      throw new Error(errorData.error || 'Failed to fetch appointment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getAppointmentById:', error);
    return null;
  }
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'closed'): Promise<Appointment> {
  try {
    // Validate status
    if (!['pending', 'confirmed', 'closed'].includes(status)) {
      throw new Error('Invalid status. Must be one of: pending, confirmed, closed');
    }

    // Use API route instead of direct Supabase access for better security
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Check for specific database schema errors
      if (errorData.error?.includes('status') || errorData.error?.includes('column') || 
          errorData.error?.code === '42703') {
        // This is likely a schema issue - recommend running the schema update
        throw new Error('Database schema error: status column may be missing. Try using the "Verify Database Schema" button.');
      }
      
      console.error('Error updating appointment status:', errorData);
      throw new Error(errorData.error || 'Failed to update appointment status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in updateAppointmentStatus:', error);
    throw error;
  }
}
