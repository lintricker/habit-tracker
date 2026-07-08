import { useState } from 'react'
import { PiDotsThreeVertical, PiPencil, PiTrash } from 'react-icons/pi'

interface HabitCardProps {
  key: number
  name: string
  text: string
  icon: string
  completed: boolean
  onEdit?: () => void
  onDelete?: () => void
  onToggle?: () => void
}

const HabitCard = ({ 
  name, 
  text, 
  icon, 
  completed,
  onEdit,
  onDelete,
  onToggle 
}: HabitCardProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={`bg-white dark:bg-zinc-800 rounded-xl p-5 
                     border-2 transition-all duration-200 cursor-pointer
                     relative group
                     ${completed 
                       ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                       : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                     }`}>
      {/* Кнопка меню - сдвигаем левее (right-12 вместо right-3) */}
      <div className="absolute top-3 right-12 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 
                     text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 
                     transition-opacity"
        >
          <PiDotsThreeVertical size={20} />
        </button>
      </div>

      {/* Выпадающее меню - вынесено на уровень карточки */}
      {showMenu && (
        <div className="absolute right-3 top-12 w-40 bg-white dark:bg-zinc-800 
                      rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 
                      py-1 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(false)
              onEdit?.()
            }}
            className="w-full px-4 py-2 text-left text-sm 
                     hover:bg-gray-100 dark:hover:bg-zinc-700 
                     text-gray-700 dark:text-gray-300
                     flex items-center gap-2"
          >
            <PiPencil size={16} />
            Редактировать
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(false)
              onDelete?.()
            }}
            className="w-full px-4 py-2 text-left text-sm 
                     hover:bg-red-50 dark:hover:bg-red-900/20 
                     text-red-600 dark:text-red-400
                     flex items-center gap-2"
          >
            <PiTrash size={16} />
            Удалить
          </button>
        </div>
      )}

      {/* Контент карточки */}
      <div className="flex items-start gap-3" onClick={onToggle}>
        {icon && (
          <span className="text-2xl">{icon}</span>
        )}
        <div className="flex-1">
          <h2 className={`font-semibold text-gray-900 dark:text-white mb-1
                         ${completed ? 'line-through text-gray-500' : ''}`}>
            {name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {text}
          </p>
        </div>
        {/* Чекбокс - добавляем z-10 чтобы был поверх меню */}
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-600 
                     focus:ring-blue-500 cursor-pointer z-10 relative"
        />
      </div>
    </div>
  )
}

export default HabitCard