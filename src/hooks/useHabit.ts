import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Habit } from '../interfaces/HabitModel'

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
  const fetchHabits = async () => {
    if (!user) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    setError(null)
    
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('habits')
      .select(`
        *,
        habit_logs (
          completed_at
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    
    const habitsWithStatus: Habit[] = (data || []).map((habit: any) => ({
      id: habit.id,
      user_id: habit.user_id,
      name: habit.name,
      description: habit.description,
      icon: habit.icon,
      created_at: habit.created_at,
      completed: habit.habit_logs?.some(
        (log: any) => log.completed_at === today
      ) ?? false
    }))
    
    setHabits(habitsWithStatus)
    setLoading(false)
  }
  
  fetchHabits()
}, [user?.id])  // ← только ID, а не весь объект!

  return { habits, loading, error }
}