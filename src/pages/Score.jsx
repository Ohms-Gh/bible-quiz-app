import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("currentQuiz"));
    if (!saved) navigate("/");
    else setScoreData(saved);
  }, [navigate]);

  if (!scoreData) return null;

  const shareText = `I just scored ${scoreData.score}/${scoreData.total} on the ${scoreData.book} Bible Quiz! Try it too! ✝️`;

  const shareLink = window.location.origin;

  const handleShare = (platform) => {
    const encoded = encodeURIComponent(`${shareText} ${shareLink}`);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${encoded}`,
      twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encoded}`,
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md"
    >
      <h1 className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400 mb-4">
        Quiz Completed!
      </h1>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Book: <strong>{scoreData.book}</strong>
        </p>
        <p className="text-2xl font-semibold mt-2">
          Score: <span className="text-green-600">{scoreData.score}</span> /{" "}
          {scoreData.total}
        </p>
      </div>

      <div className="space-y-4">
        {scoreData.questions.map((q, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border dark:border-slate-700 bg-gray-50 dark:bg-slate-700"
          >
            <p className="font-semibold mb-2">
              {i + 1}. {q.question}
            </p>
            <p
              className={`text-sm ${
                q.userAnswer === q.correctAnswer
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Your Answer: {q.userAnswer || "—"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Correct Answer: {q.correctAnswer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Facebook
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
        >
          Twitter
        </button>
        <button
          onClick={() => handleShare("whatsapp")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
