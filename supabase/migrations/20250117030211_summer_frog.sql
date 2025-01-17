/*
  # Add security policies to schedules table (if not exists)

  1. Security Updates
    - Enable RLS (if not already enabled)
    - Add read access policy (if not exists)
    - Add admin access policy (if not exists)
*/

-- Enable RLS (this is idempotent)
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop read access policy if exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'schedules' 
    AND policyname = 'Enable read access for all authenticated users'
  ) THEN
    DROP POLICY "Enable read access for all authenticated users" ON schedules;
  END IF;

  -- Drop admin access policy if exists
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'schedules' 
    AND policyname = 'Enable full access for admin users'
  ) THEN
    DROP POLICY "Enable full access for admin users" ON schedules;
  END IF;
END $$;

-- Create read access policy
CREATE POLICY "Enable read access for all authenticated users"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (true);

-- Create admin access policy
CREATE POLICY "Enable full access for admin users"
  ON schedules
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');