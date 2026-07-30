import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  email: string | null
  username: string | null
  loading: boolean
  logout: () => Promise<void>
  refetch: () => Promise<void>  // ← добавили
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Вынесли логику загрузки в отдельную функцию
  const refetch = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setEmail(user?.email ?? null)
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()
      
      setUsername(profile?.username ?? null)
    } else {
      setEmail(null)
      setUsername(null)
    }
    
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
          setUser(session?.user ?? null)
          setEmail(session?.user?.email ?? null)          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', session.user.id)
              .single()
            
            setUsername(profile?.username ?? null)
          } else {
            setEmail(null)
            setUsername(null)
          }
          
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [refetch])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setEmail(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ user, email, username, loading, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}