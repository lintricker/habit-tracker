import './App.css'
import { ThemeToggle } from './components/ThemeToggle'

import useThemeStore from './stores/useThemeStore'
import { useEffect } from 'react'


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
    <div className="bg-white dark:bg-zinc-800 grid place-items-center h-screen w-full">
      <ThemeToggle />
    </div> 
  )
}

export default App
