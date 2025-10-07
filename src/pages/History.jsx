import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    setHistory(saved.reverse());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md"
    >
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-600 dark:text-purple-400">
        Quiz History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No history available yet. Try taking a quiz!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100 dark:bg-slate-700 text-left">
                <th className="p-2">Book</th>
                <th className="p-2">Score</th>
                <th className="p-2">Total</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, idx) => (
                <tr
                  key={idx}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <td className="p-2">{entry.book}</td>
                  <td className="p-2 text-green-600">{entry.score}</td>
                  <td className="p-2">{entry.total}</td>
                  <td className="p-2 text-sm text-gray-500">
                    {new Date(entry.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
