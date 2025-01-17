/*
  # Add duration column to schedules table

  1. Changes
    - Add duration column to schedules table with validation
    - Set default value to 1
    - Add check constraint to ensure duration is between 1 and 4

  2. Notes
    - Duration represents the number of periods a class takes
    - Values are restricted to 1-4 periods
*/

-- Add duration column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'schedules' AND column_name = 'duration'
  ) THEN
    ALTER TABLE schedules 
    ADD COLUMN duration integer NOT NULL DEFAULT 1 
    CHECK (duration BETWEEN 1 AND 4);
  END IF;
END $$;