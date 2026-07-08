import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Habit } from './useHabit'

export const useHabitActions = () => {
  const { user } = useAuth()

  const toggleHabit = async (habitId: number, currentStatus: boolean) => {
    if (!user) return { error: new Error('Not authenticated') }
    
    const today = new Date().toISOString().split('T')[0]
    
    if (currentStatus) {
      // Убираем отметку (было выполнено → стало не выполнено)
      const { error } = await supabase
        .from('habit_logs')
        .delete()
        .eq('habit_id', habitId)
        .eq('user_id', user.id)
        .eq('completed_at', today)
      
      return { error }
    } else {
      // Добавляем отметку (было не выполнено → стало выполнено)
      const { error } = await supabase
        .from('habit_logs')
        .insert([
          { 
            habit_id: habitId, 
            user_id: user.id, 
            completed_at: today 
          }
        ])
      
      return { error }
    }
  }

  const createHabit = async (name: string, description: string, icon: string) => {
    if (!user) return { data: null, error: new Error('Not authenticated') }

    const { data, error } = await supabase
    .from('habits')
    .insert({
      user_id: user.id, 
      name,
      description,
      icon,
    })
    .select()
    .single()
    return { data, error }
  }

  const updateHabit = async (habitId: number, updates: any) => {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', habitId)
      .eq('user_id', user?.id)
      .select()
    
    return { data, error }
  }

  const deleteHabit = async (habitId: number) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId)
      .eq('user_id', user?.id)
    
    return { error }
  }

  return { toggleHabit, createHabit, updateHabit, deleteHabit }
}