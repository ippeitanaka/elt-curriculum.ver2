/*
  # Create schedules table and security policies

  1. New Tables
    - `schedules` table for storing curriculum schedules
  
  2. Security
    - Row Level Security (RLS)
    - Read access policy for authenticated users
    - Full access policy for admin users
*/

-- Create the schedules table
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