import { supabase } from '../lib/supabase'

export const useHabitActions = () => {
  const addHabit = async (userId: string, name: string, description?: string, icon?: string) => {
    const { data, error } = await supabase
      .from('habits')
      .insert([{ user_id: userId, name, description, icon }])
      .select()
    
    return { data, error }
  }

  const updateHabit = async (id: number, updates: any) => {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
    
    return { data, error }
  }

  const deleteHabit = async (id: number) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)
    
    return { error }
  }

  return { addHabit, updateHabit, deleteHabit }
}