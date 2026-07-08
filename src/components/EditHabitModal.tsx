import { useState, useEffect } from 'react'
import { PiX } from 'react-icons/pi'

interface Habit {
  id: number
  name: string
  description: string | null
  icon: string | null
}

interface EditHabitModalProps {
  habit: Habit | null
  isOpen: boolean
  onClose: () => void
  onSave: (updates: Partial<Habit>) => Promise<void>
}

const EditHabitModal = ({ habit, isOpen, onClose, onSave }: EditHabitModalProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Заполняем форму данными привычки при открытии
  useEffect(() => {
    if (habit) {
      setName(habit.name)
      setDescription(habit.description || '')
      setIcon(habit.icon || '')
    }
  }, [habit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      await onSave({ name, description, icon })
    } catch (error) {
      console.error('Error saving habit:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen || !habit) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Редактировать привычку</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg 
                     text-gray-500 dark:text-gray-400"
          >
            <PiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Название
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg dark:bg-zinc-700 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg dark:bg-zinc-700 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Иконка (эмодзи)
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="💧"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg dark:bg-zinc-700 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg text-gray-700 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                       text-white rounded-lg transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditHabitModal