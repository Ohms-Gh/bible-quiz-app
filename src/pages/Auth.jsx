import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth({setUser}){
  const [name, setName] = useState('')
  const nav = useNavigate()
  function submit(e){
    e.preventDefault()
    if(!name) return alert('Enter a name')
    const isAdmin = name.toLowerCase().includes('admin')
    const user = {name, id: 'u'+Date.now(), isAdmin}
    setUser(user)
    localStorage.setItem('bqa_user', JSON.stringify(user))
    nav('/')
  }
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Sign In</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Use any name. Names containing "admin" become an Admin account.</p>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded bg-transparent" />
        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Sign In</button>
          <button type="button" onClick={()=>{ setUser({name:'Guest', id:'guest', isAdmin:false}) ; nav('/') }} className="px-4 py-2 border rounded">Continue as Guest</button>
        </div>
      </form>
    </div>
  )
}
