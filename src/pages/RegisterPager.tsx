import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Регистрируем пользователя
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    

    if (error) {
      alert(error.message)
      return
    }

    // 2. Создаём профиль
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: data.user.id, 
            username: username 
          }
        ])

      if (profileError) {
        alert(profileError.message)
        return
      }
    }

    // 3. Редирект на страницу входа
    navigate('/login')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Регистрация
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium dark:text-white">
            Имя пользователя
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Alina"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       dark:text-white dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium dark:text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       dark:text-white dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium dark:text-white">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       dark:text-white dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium 
                     py-2 px-4 rounded-lg transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Войти
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage