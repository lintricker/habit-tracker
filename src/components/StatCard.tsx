interface StatCardProps {
  label: string  // "Привычек всего"
  value: string  // "5"
  icon?: string  // "📊"
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl m-2 p-6 
                    bg-linear-to-br from-blue-400 to-blue-700 
                    dark:from-blue-500 dark:to-blue-800
                    text-white shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-1">
      <div className="relative z-10">
        <p className="text-lg opacity-90 mb-1">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon && (
        <span className="absolute right-4 top-4 text-4xl opacity-20">
          {icon}
        </span>
      )}
    </div>
  )
}

export default StatCard