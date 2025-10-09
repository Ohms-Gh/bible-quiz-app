import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Score() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("bqa_user") || "null");
    if (!currentUser || !currentUser.name) {
      navigate("/auth");
      return;
    }

    if (result) {
      // Save full quiz history including answers
      const history = JSON.parse(localStorage.getItem("bqa_history") || "[]");
      const record = {
        id: "h" + Date.now(),
        user: currentUser.name,
        book: result.book || "Unknown Book",
        score: result.score || 0,
        total: result.total || 0,
        date: new Date().toISOString(),
        questions: result.questions?.map((q) => ({
          question: q.question,
          correctAnswer: q.correct_answer || q.correctAnswer,
          userAnswer: q.userAnswer,
        })) || [],
      };
      localStorage.setItem("bqa_history", JSON.stringify([record, ...history]));
    }
  }, [result, navigate]);

  if (!result) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded shadow text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          No score data found.
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const { score, total, questions } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg text-center max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Quiz Completed!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>.
      </p>

      <div className="border-t border-gray-300 dark:border-slate-700 my-4"></div>

      <div className="max-h-60 overflow-y-auto text-left space-y-2">
        {questions?.map((q, i) => (
          <div key={i} className="p-2 border rounded dark:border-slate-700">
            <p className="font-medium">{i + 1}. {q.question}</p>
            <p
              className={`text-sm ${
                q.userAnswer === q.correct_answer || q.userAnswer === q.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Your answer: {q.userAnswer || "—"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Correct: {q.correct_answer || q.correctAnswer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/quiz")}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          Retry
        </button>
      </div>
    </motion.div>
  );
}
