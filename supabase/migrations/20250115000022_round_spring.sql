/*
  # Create schedules table

  1. New Tables
    - `schedules`
      - `id` (uuid, primary key)
      - `date` (date, not null)
      - `period` (integer, not null)
      - `duration` (integer, not null)
      - `subject` (text, not null)
      - `teacher` (text, not null)
      - `room` (text)
      - `department` (text, not null)
      - `class` (text, not null)
      - `year` (integer, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `schedules` table
    - Add policy for authenticated users to read all schedules
    - Add policy for admin users to manage schedules
*/

CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  period integer NOT NULL CHECK (period BETWEEN 1 AND 6),
  duration integer NOT NULL CHECK (duration BETWEEN 1 AND 4),
  subject text NOT NULL,
  teacher text NOT NULL,
  room text,
  department text NOT NULL CHECK (department IN ('day', 'night')),
  class text NOT NULL CHECK (class IN ('A', 'B', 'N')),
  year integer NOT NULL CHECK (year BETWEEN 1 AND 3),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Policy for reading schedules (all authenticated users can read)
CREATE POLICY "Enable read access for all authenticated users"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for managing schedules (only admin users can manage)
CREATE POLICY "Enable full access for admin users"
  ON schedules
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');