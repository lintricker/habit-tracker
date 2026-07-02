import HabitCard from "../components/HabitCard"

const HabitsPage = () => {
  const habits = [
    { id: 1, name: 'Drink water', text: '2l every day', icon: '💧', completed: true },
    { id: 2, name: 'Read', text: '100 pages every day', icon: '📚', completed: false },
    { id: 3, name: 'Running', text: '30 mins in the morning', icon: '🏃', completed: false },
    { id: 4, name: 'Gym', text: 'abs', icon: '🏃', completed: false },
    { id: 5, name: 'Swimming', text: 'Swim at Tuesday in the evening', icon: '💧', completed: true },
  ]
  let currDate = new Date()
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">{currDate.toLocaleDateString()}</h1>
          <p>Mark completed today</p>
        </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Add habit
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <HabitCard 
            key={habit.id} // Обязательно нужен уникальный key!
            name={habit.name} 
            text={habit.text}
            icon={habit.icon}
            completed={habit.completed}
          />
        ))}
      </div>
    </div>
  )
}
export default HabitsPage