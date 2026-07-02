import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Получаем текущего пользователя при монтировании
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    // 2. Подписываемся на изменения auth-состояния
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // 3. Отписываемся при размонтировании
    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    // Обновляем user вручную (на всякий случай)
    if (data.user) setUser(data.user)
    
    return { data, error }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)  // Очищаем сразу
    return { error }
  }

  const register = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { id: data.user.id, username }
      ])
      
      if (profileError) {
        return { data, error: profileError }
      }
    }
    
    return { data, error }
  }

  return { user, loading, login, logout, register }
}