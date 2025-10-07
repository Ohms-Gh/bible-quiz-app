import React, {useState, useEffect} from 'react'
import { CSVLink } from 'react-csv'
import { motion } from 'framer-motion'

const BOOKS = [
"Genesis",
"Exodus",
"Leviticus",
"Numbers",
"Deuteronomy",
"Joshua",
"Judges",
"Ruth",
"1 Samuel",
"2 Samuel",
"1 Kings",
"2 Kings",
"1 Chronicles",
"2 Chronicles",
"Ezra",
"Nehemiah",
"Esther",
"Job",
"Psalms",
"Proverbs",
"Ecclesiastes",
"Song of Solomon",
"Isaiah",
"Jeremiah",
"Lamentations",
"Ezekiel",
"Daniel",
"Hosea",
"Joel",
"Amos",
"Obadiah",
"Jonah",
"Micah",
"Nahum",
"Habakkuk",
"Zephaniah",
"Haggai",
"Zechariah",
"Malachi",
"Matthew",
"Mark",
"Luke",
"John",
"Acts",
"Romans",
"1 Corinthians",
"2 Corinthians",
"Galatians",
"Ephesians",
"Philippians",
"Colossians",
"1 Thessalonians",
"2 Thessalonians",
"1 Timothy",
"2 Timothy",
"Titus",
"Philemon",
"Hebrews",
"James",
"1 Peter",
"2 Peter",
"1 John",
"2 John",
"3 John",
"Jude",
"Revelation"
]

export default function Admin(){ 
  const currentUser = JSON.parse(localStorage.getItem('bqa_user')||'null')
  if(!currentUser || !currentUser.isAdmin){
    return <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">Access denied. Admins only. Please sign in as an admin.</div>
  }

  const [questions, setQuestions] = useState(()=> JSON.parse(localStorage.getItem('bqa_custom_questions')||'[]'))
  const [history, setHistory] = useState(()=> JSON.parse(localStorage.getItem('bqa_history')||'[]'))
  const [form, setForm] = useState({type:'multiple', book:BOOKS[0], question:'', correct_answer:'', incorrect1:'', incorrect2:'', incorrect3:'', timer:30})
  const [editing, setEditing] = useState(null)
  const [qSearch, setQSearch] = useState('')
  const [preview, setPreview] = useState(null)

  useEffect(()=> { localStorage.setItem('bqa_custom_questions', JSON.stringify(questions)) }, [questions])

  function addQuestion(e){
    e.preventDefault()
    if(editing){
      setQuestions(questions.map(q=> q.id === editing.id ? {...editing, ...form} : q))
      setEditing(null)
    } else {
      const q = {
        id: 'c'+Date.now(),
        type: form.type,
        book: form.book,
        question: form.question,
        correct_answer: form.correct_answer,
        incorrect_answers: form.type==='multiple' ? [form.incorrect1, form.incorrect2, form.incorrect3] : [],
        timer: Number(form.timer||30)
      }
      setQuestions([q, ...questions])
    }
    setForm({type:'multiple', book:BOOKS[0], question:'', correct_answer:'', incorrect1:'', incorrect2:'', incorrect3:'', timer:30})
  }

  function startEdit(q){
    setEditing(q)
    setForm({type:q.type, book:q.book, question:q.question, correct_answer:q.correct_answer, incorrect1:q.incorrect_answers[0]||'', incorrect2:q.incorrect_answers[1]||'', incorrect3:q.incorrect_answers[2]||'', timer:q.timer||30})
    window.scrollTo({top:0, behavior:'smooth'})
  }

  function deleteQ(id){
    if(!confirm('Delete question?')) return
    setQuestions(questions.filter(q=>q.id !== id))
  }

  function clearHistory(){ if(confirm('Clear history?')){ localStorage.removeItem('bqa_history'); setHistory([]) } }

  const filtered = questions.filter(q=> q.book === form.book && q.question.toLowerCase().includes(qSearch.toLowerCase()))

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-6 card">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Admin Dashboard</h2>

      <section>
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Add / Edit a Bible Question</h3>
        <form onSubmit={addQuestion} className="grid gap-2 mt-2">
          <label className="text-sm">Question Type</label>
          <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="p-2 border rounded bg-transparent">
            <option value="multiple">Multiple Choice</option>
            <option value="written">Written Answer</option>
            <option value="tf">True / False</option>
          </select>

          <label className="text-sm">Book</label>
          <select value={form.book} onChange={e=>setForm({...form, book:e.target.value})} className="p-2 border rounded bg-transparent">
            {BOOKS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <input required value={form.question} onChange={e=>setForm({...form, question:e.target.value})} placeholder="Question" className="p-2 border rounded bg-transparent" />

          {form.type === 'multiple' && <>
            <input required value={form.correct_answer} onChange={e=>setForm({...form, correct_answer:e.target.value})} placeholder="Correct answer" className="p-2 border rounded bg-transparent" />
            <input required value={form.incorrect1} onChange={e=>setForm({...form, incorrect1:e.target.value})} placeholder="Incorrect answer 1" className="p-2 border rounded bg-transparent" />
            <input required value={form.incorrect2} onChange={e=>setForm({...form, incorrect2:e.target.value})} placeholder="Incorrect answer 2" className="p-2 border rounded bg-transparent" />
            <input required value={form.incorrect3} onChange={e=>setForm({...form, incorrect3:e.target.value})} placeholder="Incorrect answer 3" className="p-2 border rounded bg-transparent" />
          </>}

          {form.type === 'written' && <input required value={form.correct_answer} onChange={e=>setForm({...form, correct_answer:e.target.value})} placeholder="Expected answer (text)" className="p-2 border rounded bg-transparent" />}

          {form.type === 'tf' && <select value={form.correct_answer} onChange={e=>setForm({...form, correct_answer:e.target.value})} className="p-2 border rounded bg-transparent">
            <option value="True">True</option>
            <option value="False">False</option>
          </select>}

          <label className="text-sm">Time per question (seconds)</label>
          <input type="number" value={form.timer} min={5} max={600} onChange={e=>setForm({...form, timer: e.target.value})} className="p-2 border rounded bg-transparent" />

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded">{editing? 'Update Question':'Add Question'}</button>
            <button type="button" onClick={()=>{ setQuestions([]); localStorage.removeItem('bqa_custom_questions') }} className="px-4 py-2 border rounded">Clear Questions</button>
            {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({type:'multiple', book:BOOKS[0], question:'', correct_answer:'', incorrect1:'', incorrect2:'', incorrect3:'', timer:30}) }} className="px-4 py-2 border rounded">Cancel</button>}
          </div>
        </form>
      </section>

      <section>
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Questions (manage by book)</h3>
        <div className="mt-2 flex gap-2 items-center">
          <input value={qSearch} onChange={e=>setQSearch(e.target.value)} placeholder="Search questions..." className="p-2 border rounded bg-transparent" />
          <CSVLink filename={'bible_questions.csv'} data={questions} className="px-3 py-2 bg-emerald-500 text-white rounded">Export CSV</CSVLink>
        </div>
        <div className="mt-2 space-y-2 max-h-64 overflow-auto">
          {filtered.length? filtered.map(q=>(
            <div key={q.id} className="p-2 border rounded flex justify-between items-center bg-white dark:bg-slate-800">
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-100">{q.question}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Type: {q.type} • Time: {q.timer}s</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setPreview(q)} className="px-3 py-1 border rounded">Preview</button>
                <button onClick={()=>startEdit(q)} className="px-3 py-1 border rounded">Edit</button>
                <button onClick={()=>deleteQ(q.id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
              </div>
            </div>
          )) : <div className="text-sm text-gray-500 dark:text-gray-400">No custom questions yet for this book.</div>}
        </div>
      </section>

      <section>
        <h3 className="font-medium text-gray-700 dark:text-gray-200">User History</h3>
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total attempts: {history.length}</div>
            <button onClick={clearHistory} className="px-3 py-1 border rounded">Clear</button>
          </div>
          <div className="max-h-40 overflow-auto space-y-2">
            {history.length? history.map(h=>(
              <div key={h.id} className="p-2 border rounded flex justify-between bg-white dark:bg-slate-800">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-100">{h.user}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(h.date).toLocaleString()} - {h.book}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 dark:text-gray-100">{h.score}/{h.total}</div>
                </div>
              </div>
            )) : <div className="text-sm text-gray-500 dark:text-gray-400">No history yet.</div>}
          </div>
        </div>
      </section>

      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded shadow max-w-lg w-full">
            <h4 className="font-semibold mb-2">Preview Question</h4>
            <div className="mb-3">{preview.question}</div>
            <div className="grid gap-2">
              {[...(preview.incorrect_answers||[]), preview.correct_answer].map(a=> (
                <div key={a} className={`p-2 rounded border ${a===preview.correct_answer ? 'bg-green-50 dark:bg-green-900' : ''}`}>{a}</div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={()=>setPreview(null)} className="px-3 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
