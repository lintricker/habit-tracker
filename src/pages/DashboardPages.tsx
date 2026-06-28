import StatCard from "../components/StatCard"

const DashboardPage = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard label="Привычек всего" value="5" icon="📊" />
      <StatCard label="Выполнено сегодня" value="3" icon="✅" />
      <StatCard label="Текущая серия" value="7" icon="🔥" />
    </div>
  )
}
export default DashboardPage