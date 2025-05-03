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
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
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
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return null;
      }
      console.error('Error fetching appointment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAppointmentById:', error);
    return null;
  }
}
