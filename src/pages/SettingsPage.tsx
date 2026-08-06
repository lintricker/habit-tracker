import { ThemeToggle } from "../components/ThemeToggle"
import { PiSignOut } from "react-icons/pi";
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { useSettingsActions } from '../hooks/useSettingsActions'
import { useEffect, useState } from "react";


const SettingsPage = () => {
  const { email, username, logout } = useAuth()
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const {updateUsername,updateEmail} = useSettingsActions()

  const navigate = useNavigate()

  useEffect(() => {
    if (username) {
      setNewUsername(username)
    }
    if (newEmail) {
      setNewEmail(newEmail)
    }
  }, [username, newEmail])

  /*useEffect(() => {
    if (email){
      setNewUsername(email)
    }
  }, [email])*/

  const handleLogout = async () => {
  await logout()
  navigate('/login')
  }

  const handleUpdateUserName = async () => {
    await updateUsername(newUsername);
  }

  const handleUpdateEmail = async () => {
    await updateEmail(newEmail);
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
          <div className="flex flex-row gap-3">
            <input id="name" type="text"  value={newUsername} className="border rounded-lg p-3 w-full text-zinc-500 dark:text-white" onChange={(e) => setNewUsername(e.target.value)}/>
            <button
              onClick={handleUpdateUserName}
              className="dark:text-white hover:text-blue-500 transition-colors"
              title="Sign out"
            >
              <MdOutlineEdit size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
          <label htmlFor="email"  className="mr-3 min-w-20">Email</label>
          <div className="flex flex-row gap-3">
            <input id="email" type="text" value={newEmail} className="border rounded-lg p-3 w-full text-zinc-500 dark:text-white" onChange={(e) => setNewEmail(e.target.value)}/>
            <button
              onClick={handleUpdateEmail}
              className="dark:text-white hover:text-blue-500 transition-colors"
              title="Sign out"
            >
              <MdOutlineEdit size={20} />
            </button>
          </div>
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
