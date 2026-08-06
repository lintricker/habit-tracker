import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../lib/supabase"

export const useSettingsActions = () => {
  const { user, refetch } = useAuth()
  
  const updateUsername = async (newUsername: string) => {
    const {data, error} = await supabase
        .from('profiles')
        .update({username: newUsername})
        .eq('id', user?.id)
    if (error) throw error
    await refetch()
    return { data, error }
  }
  
  const updateEmail = async (newEmail: string) => {
    const {data, error} = await supabase.auth.updateUser({email: newEmail})
    if (error) throw error
    return { data, error }
  }
  
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    
  }
  
  return { updateUsername, updateEmail, updatePassword }
}