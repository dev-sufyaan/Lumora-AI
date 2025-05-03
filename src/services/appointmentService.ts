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
  // Use the service client for elevated privileges
  const serviceClient = createServiceClient();

  // Ensure required fields are present (basic validation)
  if (!appointment.name || !appointment.email || !appointment.phone || !appointment.date || !appointment.time || !appointment.topic) {
    console.error('Missing required appointment fields:', appointment);
    throw new Error('Missing required fields for appointment creation.');
  }

  // Prepare data for insertion - assuming AppointmentInsert matches table structure
  // If 'id' needs to be generated client-side, ensure it's done before this point.
  // Supabase client might handle UUID generation if column default is set, but let's be explicit if needed.
  const appointmentData = {
    ...appointment,
    // Generate UUID if not provided and DB doesn't auto-generate
    // id: appointment.id || uuidv4(), // Example if using uuid library
  };

  try {
    const { data, error } = await serviceClient
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) {
      // Log detailed error information
      console.error('Error creating appointment:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    return data;
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
