-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON schedules;
DROP POLICY IF EXISTS "Enable full access for admin users" ON schedules;

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read
CREATE POLICY "Enable read access for all users"
  ON schedules
  FOR SELECT
  USING (true);

-- Create a policy that allows all authenticated users to insert
CREATE POLICY "Enable insert for all users"
  ON schedules
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows admin users to update and delete
CREATE POLICY "Enable update and delete for admin users"
  ON schedules
  FOR ALL
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');