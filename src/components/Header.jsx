import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { getInitialTheme, setTheme } from '../utils/theme'

export default function Header({user, setUser}){
  const nav = useNavigate()
  const [theme, setLocalTheme] = useState(getInitialTheme())

  useEffect(()=>{ setTheme(theme) }, [theme])

  function logout(){ setUser(null); localStorage.removeItem('bqa_user'); nav('/') }
  function toggleTheme(){ const t = theme === 'dark' ? 'light' : 'dark'; setLocalTheme(t) }

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm mb-6 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">BQ</div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Bible Quiz App</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Learn & Track your Bible knowledge</p>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          {user ? <Link to="/history" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">History</Link> : null}
          {user && user.isAdmin ? <Link to="/admin" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">Admin</Link> : null}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-200">Hi, <strong>{user.name}</strong></span>
              <button onClick={logout} className="text-sm px-3 py-1 rounded bg-purple-600 text-white">Logout</button>
            </div>
          ) : (
            <Link to="/auth" className="text-sm px-3 py-1 rounded bg-purple-600 text-white">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
