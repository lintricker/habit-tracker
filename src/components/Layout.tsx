import { Link, Outlet, useNavigate } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import { PiSignOutThin } from "react-icons/pi";
import { supabase } from "../lib/supabase";
import { useState } from "react";


const Layout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(error.message)
      return
    }
    
    console.log("Signed out")
    navigate('/login')
  }
    return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900">
      {}
      <header className="border-b border-zinc-300 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="dark:text-white"><h1 className="text-xl font-bold dark:text-white">Habit Tracker</h1></Link>
          <nav className="flex gap-4 items-center">        
            <Link to="/habits" className="hover:text-blue-500 dark:text-white">Habits</Link>
            <Link to="/settings" className="hover:text-blue-500 dark:text-white">Settings</Link>
            <button
              onClick={handleLogout}
              className="dark:text-white hover:text-blue-500 transition-colors"
              title="Sign out"
            >
              <PiSignOutThin size={20} />
            </button>
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