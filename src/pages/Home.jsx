import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function Home(){
  const [book, setBook] = useState(BOOKS[0])
  const [amount, setAmount] = useState(10)
  const navigate = useNavigate()
  function start(){ const params = new URLSearchParams({book, amount}); navigate('/quiz?' + params.toString()) }
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow card">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Start a Bible Quiz</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select a book of the Bible to be quizzed on. Questions come only from that book.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Select Book</label>
          <select value={book} onChange={e=>setBook(e.target.value)} className="mt-2 w-full border rounded p-2 bg-transparent">
            {BOOKS.map(b=> <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">Number of questions</label>
          <input type="number" value={amount} min={1} max={50} onChange={e=>setAmount(Number(e.target.value))} className="mt-2 w-24 border rounded p-2 bg-transparent" />
          <div className="mt-6"><button onClick={start} className="px-4 py-2 bg-purple-600 text-white rounded shadow">Start Quiz</button></div>
        </div>
      </div>
    </motion.div>
  )
}
