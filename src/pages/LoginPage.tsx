import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 max-w-md mx-auto p-6">
      <h1 className="dark:text-white font-bold text-3xl text-center mb-6">
        Login page
      </h1>
      
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="dark:text-white text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       dark:text-white dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="dark:text-white text-sm font-medium">
            Password
          </label>
          <input 
            id="password" 
            type="password" 
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                       dark:text-white dark:bg-zinc-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="bg-zinc-900 dark:bg-blue-500 py-2 px-4 rounded-lg text-white mt-4 hover:bg-zinc-800 dark:hover:bg-blue-600 transition-colors">
          Sign in
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