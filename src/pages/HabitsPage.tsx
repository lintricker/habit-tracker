import { useState } from 'react'
import HabitCard from '../components/HabitCard'
import EditHabitModal from '../components/EditHabitModal'
import { useHabits } from '../hooks/useHabit'
import { useHabitActions } from '../hooks/useHabitActions'
import CreateHabitModal from '../components/CreateHabitModal'

const HabitsPage = () => {
  const { habits, loading, error, refetch } = useHabits()
  const { createHabit, toggleHabit, updateHabit, deleteHabit } = useHabitActions()
  
  // Состояние для модалки
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleToggle = async (habitId: number, currentStatus: boolean) => {
    await toggleHabit(habitId, currentStatus)
    await refetch()
  }

  const handleCreate = async (name: string, description: string, icon: string) => {
    const { error } = await createHabit(name, description, icon)
    if (error) {
      alert('Не удалось создать привычку: ' + error.message)
      return
    }
    setIsCreateModalOpen(false)
    await refetch()
  }

  const handleEdit = (habitId: number) => {
    setEditingHabitId(habitId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingHabitId(null)
  }

  const handleSaveHabit = async (updates: any) => {
    if (!editingHabitId) return
    
    await updateHabit(editingHabitId, updates)
    await refetch()
    handleCloseModal()
  }

  const handleDelete = async (habitId: number) => {
    if (confirm('Удалить эту привычку?')) {
      await deleteHabit(habitId)
      await refetch()
    }
  }

  // Находим привычку по ID
  const editingHabit = habits.find(h => h.id === editingHabitId) || null

  if (loading) return <div className="dark:text-white">Загрузка...</div>
  if (error) return <div className="text-red-500">Ошибка: {error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {new Date().toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Mark completed today</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Add habit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            name={habit.name}
            text={habit.description ?? ''}
            icon={habit.icon ?? ''}
            completed={habit.completed}
            onToggle={() => handleToggle(habit.id, habit.completed)}
            onEdit={() => handleEdit(habit.id)}
            onDelete={() => handleDelete(habit.id)}
          />
        ))}
      </div>
      
       {/* Модалка создания */}
      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      {/* Модалка редактирования */}
      <EditHabitModal
        habit={editingHabit}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveHabit}
      />
    </div>
  )
}

export default HabitsPage