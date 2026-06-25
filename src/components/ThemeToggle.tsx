export function ThemeToggle () {
    return(
        <label className="relative cursor-pointer">
            <input type="checkbox" className="sr-only peer"></input>
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300"></div>
        </label>
    )
}