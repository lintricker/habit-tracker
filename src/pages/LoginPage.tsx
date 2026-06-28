
const LoginPage = () => {
  
  return (
    <div className="bg-white flex flex-col dark:bg-zinc-900 max-w-md mx-auto">
      <h1 className="dark:text-white m-2 font-bold">Login page</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="email" className="dark:text-white text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border p-2 rounded-lg border-zinc-900 dark:text-white dark:border-white"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password" className="dark:text-white text-sm font-medium">
          Password
        </label>
        <input 
          id="password" 
          type="password" 
          className="border p-2 rounded-lg border-zinc-900 dark:text-white dark:border-white" />
      </div>
      <button className="bg-zinc-900 dark:bg-blue-500 m-6 pr-4 pl-4 p-2 rounded-lg text-white">Sign in</button>
    </div>
    
  )
}
export default LoginPage