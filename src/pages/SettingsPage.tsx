import { ThemeToggle } from "../components/ThemeToggle"
import { PiSignOut } from "react-icons/pi";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";


const SettingsPage = () => {
  const { email, username, logout } = useAuth()
    const navigate = useNavigate()
   
    const handleLogout = async () => {
    await logout()
    navigate('/login')
    }
  return (
    <div className="dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Настройки</h1>
      </div>
      <div className="flex flex-col gap-4 max-w-lg">
        <p className="text-xl font-semibold">Профиль</p>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
          <label htmlFor="name" className="mr-3 min-w-20">Name</label>
          <input id="name" type="text"  value={username?.toString()} className="border rounded-lg p-3 w-full text-zinc-500 dark:text-white" readOnly/>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
          <label htmlFor="email"  className="mr-3 min-w-20">Email</label>
          <input id="email" type="text" value={email?.toString()} className="border rounded-lg p-3 w-full text-zinc-500 dark:text-white" readOnly/>
        </div>        
      </div>
      <div className="flex flex-col gap-4 max-w-lg">
        <p className="text-xl font-semibold">Оформление</p>
        <div className="flex flex-row">
          <label className="mr-2">Сменить тему</label>
          <ThemeToggle/>
        </div>  
      </div>
      <div className="mt-5 flex flex-row">
        <button 
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 flex flex-row items-center text-white px-4 py-2 rounded-lg transition-colors gap-2">
          <PiSignOut />
          <p>Sign out</p>
        </button>
      </div>
    </div>
  )
}
export default SettingsPage