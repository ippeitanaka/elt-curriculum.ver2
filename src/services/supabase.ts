import { supabase } from '../lib/supabase';
import { Schedule } from '../types/schedule';

export async function fetchSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }

  return data;
}

export async function insertSchedules(schedules: Omit<Schedule, 'id'>[]) {
  // Begin transaction
  const { error: deleteError } = await supabase
    .from('schedules')
    .delete()
    .not('id', 'eq', '00000000-0000-0000-0000-000000000000'); // Delete all existing records

  if (deleteError) {
    console.error('Error deleting existing schedules:', deleteError);
    throw deleteError;
  }

  // Insert new records
  const { data, error } = await supabase
    .from('schedules')
    .insert(schedules.map(schedule => ({
      ...schedule,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })))
    .select();

  if (error) {
    console.error('Error inserting schedules:', error);
    throw error;
  }

  return data;
}

export async function updateSchedule(id: string, schedule: Partial<Schedule>) {
  const { data, error } = await supabase
    .from('schedules')
    .update({
      ...schedule,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }

  return data;
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
}

// 新しく追加する関数
export async function clearAllSchedules() {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .not('id', 'eq', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.error('Error clearing schedules:', error);
    throw error;
  }
}