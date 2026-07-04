import type { Habit } from "../interfaces/HabitModel";
import { supabase } from "../lib/supabase";

export const getHabits = async (userId: string) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const createHabit = async (userId: string, name: string, description?: string, icon?: string) => {
  const { data, error } = await supabase
    .from('habits')
    .insert([{ user_id: userId, name, description, icon }])
    .select()
  
  return { data, error }
}

export const updateHabit = async (id: number, updates: Partial<Habit>) => {
  const { data, error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data, error }
}