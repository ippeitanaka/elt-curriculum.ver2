/*
  # Update duration constraint for schedules table

  1. Changes
    - Modify duration column constraint to allow values up to 400
    - Previous constraint was 1-4, new constraint is 1-400

  2. Notes
    - Duration represents the number of periods a class takes
    - Values are restricted to 1-400 periods
*/

-- Drop existing check constraint if it exists
DO $$ 
BEGIN
  ALTER TABLE schedules 
    DROP CONSTRAINT IF EXISTS schedules_duration_check;

  -- Add new check constraint
  ALTER TABLE schedules 
    ADD CONSTRAINT schedules_duration_check 
    CHECK (duration BETWEEN 1 AND 400);
END $$;