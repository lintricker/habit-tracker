import { useEffect, useState } from "react"
import HabitCard from "../components/HabitCard"
import { useAuth } from "../hooks/useAuth"
import { getHabits } from "../api/habits"
import type { Habit } from "../interfaces/HabitModel"

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const { user } = useAuth()
  const currDate = new Date() 

  useEffect(() => {
    console.log("rerender")
    if (user) {
      getHabits(user.id).then(({ data }) => {
        setHabits(data || [])
      })
    }
  }, [user])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {currDate.toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Mark completed today</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Add habit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <HabitCard 
            key={habit.id}
            name={habit.name} 
            text={habit.description ?? ''}  // ✅ description вместо text
            icon={habit.icon ?? ''}
            completed={habit.completed}  // ✅ работает, если добавили в getHabits
          />
        ))}
      </div>
    </div>
  )
}

export default HabitsPage