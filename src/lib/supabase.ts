import { createClient } from '@supabase/supabase-js';

// User Supabase Project credentials
export const SUPABASE_PROJECT_ID = 'hbntsxrbzdizokpbubpe';
export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_l6c5rQtjK5Y9VtI3kDOLbw_MjceL6Kw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * SQL script for creating the tables in Supabase SQL Editor if not already created.
 */
export const SUPABASE_SQL_SETUP = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)

-- 1. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  reference_number TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  message TEXT,
  communication_preference TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Inquiries Table (optional for contact form)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS) & Public Policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts and reads for appointments
DROP POLICY IF EXISTS "Public can insert appointments" ON public.appointments;
CREATE POLICY "Public can insert appointments" ON public.appointments
  FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view appointments" ON public.appointments;
CREATE POLICY "Public can view appointments" ON public.appointments
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Public can update appointments" ON public.appointments;
CREATE POLICY "Public can update appointments" ON public.appointments
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow public inserts for contact inquiries
DROP POLICY IF EXISTS "Public can insert inquiries" ON public.contact_inquiries;
CREATE POLICY "Public can insert inquiries" ON public.contact_inquiries
  FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view inquiries" ON public.contact_inquiries;
CREATE POLICY "Public can view inquiries" ON public.contact_inquiries
  FOR SELECT TO anon USING (true);
`;
