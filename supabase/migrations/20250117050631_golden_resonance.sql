-- Drop existing check constraint if it exists
DO $$ 
BEGIN
  ALTER TABLE schedules 
    DROP CONSTRAINT IF EXISTS schedules_duration_check;

  -- Add new check constraint allowing duration to be 0 (for empty values) up to 400
  ALTER TABLE schedules 
    ADD CONSTRAINT schedules_duration_check 
    CHECK (duration >= 0 AND duration <= 400);
END $$;