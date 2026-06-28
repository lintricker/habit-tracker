import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle'

import useThemeStore from './stores/useThemeStore'
import { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPages'
import HabitsPage from './pages/HabitsPage'
import SettingsPage from './pages/SettingsPage'
import Layout from './components/Layout'


const App = () => {
  const theme = useThemeStore((state) => state.theme)
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (    
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route index element={<DashboardPage />} />
            <Route path="habits" element={<HabitsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>  
        </Routes>
    </BrowserRouter>
  )
}

export default App
