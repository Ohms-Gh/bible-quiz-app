import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Score from './pages/Score'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import History from './pages/History'

export default function App(){
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('bqa_user')) || null)
  useEffect(()=>{ localStorage.setItem('bqa_user', JSON.stringify(user)) }, [user])
  const location = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors">
      <Header user={user} setUser={setUser} />
      <main className="max-w-5xl mx-auto p-4">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/score" element={<Score />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}
