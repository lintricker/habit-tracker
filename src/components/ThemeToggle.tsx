import useThemeStore from "../stores/useThemeStore"

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <label className="relative cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        onChange={toggleTheme}  // ← вызываем функцию переключения
        checked={theme === 'dark'}  // ← отражаем текущее состояние
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-zinc-600 rounded-full transition-all duration-300"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
    </label>
  )
}