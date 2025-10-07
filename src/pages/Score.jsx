import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Score() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score = state?.score || 0;
  const total = state?.total || 0;

  const shareText = `I just scored ${score}/${total} in the Bible Quiz App!`;
  const shareUrl = "https://your-bible-quiz.app"; // replace with real link

  function share(platform) {
    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`
      );
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`
      );
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Link copied!");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow space-y-4 max-w-lg mx-auto"
    >
      <h1 className="text-2xl font-bold text-center text-purple-600 dark:text-purple-400">
        Quiz Completed!
      </h1>

      <p className="text-center text-gray-700 dark:text-gray-200">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>.
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Play Again
        </button>
        <button
          onClick={() => navigate("/history")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          View History
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Share your score:
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => share("twitter")}
            className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
          >
            Twitter
          </button>
          <button
            onClick={() => share("facebook")}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Facebook
          </button>
          <button
            onClick={() => share("copy")}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Copy Link
          </button>
        </div>
      </div>
    </motion.div>
  );
}