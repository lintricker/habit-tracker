interface HabitCardProps {
    key:number,
    name:string,
    text: string,
    icon: string,
    completed: boolean
}

const StatCard = ({ name, text, icon, completed }: HabitCardProps) => {
  return (
    <div className={`bg-white dark:bg-zinc-800 rounded-xl p-5 
                     border-2 transition-all duration-200 cursor-pointer
                     ${completed 
                       ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                       : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                     }`}>
      <div className="flex items-start gap-3">
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
        <input
          type="checkbox"
          checked={completed}
          readOnly
          className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-600 
                     focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

export default StatCard