import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, username')
          .eq('id', user.id)
          .single()
        setEmail(profile?.email ?? null)
        setUsername(profile?.username ?? null)
      }
      
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
        // Обновляем только при значимых событиях
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null)
        
        if (session?.user) {
            const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single()
            
            setUsername(profile?.username ?? null)
        } else {
            setUsername(null)
        }
        }
    }
    )

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    setUsername(null)
    return { error }
  }

  return { user, email, username, loading, logout }
}