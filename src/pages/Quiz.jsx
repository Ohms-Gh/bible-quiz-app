import React, {useEffect, useState, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Quiz(){ 
  const { search } = useLocation()
  const params = Object.fromEntries(new URLSearchParams(search))
  const book = params.book || 'Genesis'
  const amount = Number(params.amount||10)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [timerSec, setTimerSec] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [writtenAns, setWrittenAns] = useState('')
  const navigate = useNavigate()
  const timerRef = useRef(null)

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem('bqa_custom_questions')||'[]')
    const filtered = stored.filter(q=> q.book === book).slice(0, amount)
    setQuestions(filtered)
    setLoading(false)
  }, [search])

  useEffect(()=>{
    if(!questions.length) return
    const t = questions[current].timer || 30
    setTimerSec(Number(t))
    startTimer()
    return ()=> clearInterval(timerRef.current)
  }, [current, questions])

  function startTimer(){
    clearInterval(timerRef.current)
    timerRef.current = setInterval(()=>{
      setTimerSec(s=> {
        if(s<=1){
          clearInterval(timerRef.current)
          handleNext(null, true)
          return 0
        }
        return s-1
      })
    }, 1000)
  }

  function handleAnswer(selected){
    if(showAnswer) return
    const q = questions[current]
    let correct = false
    if(q.type === 'written'){
      correct = (selected || writtenAns || '').trim().toLowerCase() === (q.correct_answer||'').trim().toLowerCase()
    } else if(q.type === 'tf'){
      correct = String(selected) === String(q.correct_answer)
    } else {
      correct = selected === q.correct_answer
    }
    setShowAnswer(true)
    if(correct) setScore(s=>s+1)
    setTimeout(()=> handleNext(selected, false), 900)
  }

  function handleNext(selected, timeout){
    clearInterval(timerRef.current)
    setShowAnswer(false)
    setWrittenAns('')
    if(current+1 < questions.length){
      setCurrent(c=>c+1)
    } else {
      const history = JSON.parse(localStorage.getItem('bqa_history')||'[]')
      const user = JSON.parse(localStorage.getItem('bqa_user')||'{"name":"Guest"}')
      history.unshift({id:Date.now(), date: new Date().toISOString(), score, total:questions.length, user:user.name, book})
      localStorage.setItem('bqa_history', JSON.stringify(history))
      navigate('/score', {state:{score, total:questions.length}})
    }
  }

  if(loading) return <div className="p-6 bg-white dark:bg-slate-800 rounded shadow">Loading questions...</div>
  if(!questions.length) return <div className="p-6 bg-white dark:bg-slate-800 rounded shadow">No questions found for {book}. Ask an admin to add some!</div>

  const q = questions[current]
  const progress = Math.round((current / questions.length) * 100)
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4 card">
      <div className="flex items-center justify-between">
        <div>Question {current+1} / {questions.length} • <span className="font-medium">{q.book}</span></div>
        <div className="text-sm text-gray-500 dark:text-gray-300">Timer: {timerSec}s</div>
      </div>
      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded overflow-hidden">
        <div className="h-2 rounded" style={{width: `${progress}%`, background: 'linear-gradient(90deg,#7c3aed,#ec4899)'}} />
      </div>

      <div className="p-4 border rounded bg-white dark:bg-slate-800">
        <div className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">{q.question}</div>
        <div className="grid gap-2">
          {q.type === 'multiple' && ([...q.incorrect_answers, q.correct_answer].sort(()=>Math.random()-0.5)).map(a=> (
            <button key={a} onClick={()=>handleAnswer(a)} disabled={showAnswer}
              className={`text-left p-3 rounded border ${showAnswer ? (a===q.correct_answer? 'bg-green-50 dark:bg-green-900 border-green-300':'opacity-60 line-through') : 'hover:bg-purple-50 dark:hover:bg-slate-700'}`}>
              {a}
            </button>
          ))}

          {q.type === 'tf' && ['True','False'].map(a=> (
            <button key={a} onClick={()=>handleAnswer(a)} disabled={showAnswer}
              className={`text-left p-3 rounded border ${showAnswer ? (String(a)===String(q.correct_answer)? 'bg-green-50 dark:bg-green-900 border-green-300':'opacity-60 line-through') : 'hover:bg-purple-50 dark:hover:bg-slate-700'}`}>
              {a}
            </button>
          ))}

          {q.type === 'written' && (
            <div className="space-y-2">
              <input value={writtenAns} onChange={e=>setWrittenAns(e.target.value)} placeholder="Type your answer..." className="p-2 border rounded bg-transparent" />
              <div className="flex gap-2">
                <button onClick={()=>handleAnswer(writtenAns)} className="px-3 py-2 bg-purple-600 text-white rounded">Submit</button>
                <button onClick={()=>handleNext(null,false)} className="px-3 py-2 border rounded">Skip</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div>Score: <strong>{score}</strong></div>
        <div>
          <button onClick={()=>{ setCurrent(qs=> Math.max(0, current-1)) }} className="px-3 py-1 border rounded mr-2">Prev</button>
          <button onClick={()=>handleNext(null,false)} className="px-3 py-1 bg-purple-600 text-white rounded">Skip</button>
        </div>
      </div>
    </motion.div>
  )
}
