-- Add status column to appointments table if it doesn't exist
ALTER TABLE IF EXISTS appointments 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create index for the status column
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Comment on the status column
COMMENT ON COLUMN appointments.status IS 'Appointment status: pending, confirmed, closed'; 