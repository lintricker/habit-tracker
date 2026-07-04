export interface Habit {
  id: number
  user_id: string
  name: string
  description: string | null
  icon: string | null
  created_at: string
  completed: boolean 
}