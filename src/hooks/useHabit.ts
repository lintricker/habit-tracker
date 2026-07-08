import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Habit {
  id: number
  user_id: string
  name: string
  description: string | null
  icon: string | null
  created_at: string
  completed: boolean
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Функция загрузки привычек
  const fetchHabits = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    setError(null)
    
    const today = new Date().toISOString().split('T')[0]
    
    try {
      const { data, error } = await supabase
        .from('habits')
        .select(`
          *,
          habit_logs (
            id,
            completed_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
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
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Загружаем при монтировании
  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  return { habits, loading, error, refetch: fetchHabits }
}