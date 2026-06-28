import { Link, Outlet } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { PiSignOutThin } from "react-icons/pi";


const Layout = () => {
    return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Шапка */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="dark:text-white"><h1 className="text-xl font-bold dark:text-white">Habit Tracker</h1></Link>
          <nav className="flex gap-4 items-center">        
            <Link to="/habits" className="hover:text-blue-500 dark:text-white">Habits</Link>
            <Link to="/settings" className="hover:text-blue-500 dark:text-white">Settings</Link>
            <Link to="/login" className="dark:text-white"><PiSignOutThin /></Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Контент страницы */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout