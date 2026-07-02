import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { supabase } from "../lib/supabase"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }
    navigate('/')

  }
  return (
    <div className="bg-white dark:bg-zinc-900 max-w-md mx-auto p-6">
      <h1 className="dark:text-white font-bold text-3xl text-center mb-6">
        Login page
      </h1>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="dark:text-white text-sm font-medium">
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
          <label htmlFor="password" className="dark:text-white text-sm font-medium">
            Password
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
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-zinc-900 dark:bg-blue-500 py-2 px-4 rounded-lg text-white mt-4 hover:bg-zinc-800 dark:hover:bg-blue-600 transition-colors">
           {loading ? 'Входим...' : 'Sign in'}
        </button>
      </form>
      
      <p className="dark:text-white mt-4 text-center">
        Not registered yet?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}

export default LoginPage