📘 README.md
# 📖 Bible Quiz App

A modern, interactive **Bible Quiz Application** built with **React + Vite + Tailwind CSS + Framer Motion**.  
It allows users to test their Bible knowledge, track performance, and lets the admin manage questions (multiple choice, true/false, and written answers) — all without a backend.

---

## ✨ Features

### 👤 User
- Sign in with your name (required before starting)
- Choose a **Book of the Bible** (1 of 66)
- Take quizzes with:
  - Multiple Choice
  - True/False
  - Written Answers
- Timed questions (Admin sets duration)
- Real-time score tracking
- Animated transitions and responsive UI
- View quiz history after completion
- Share your score on social media
- Dark/Light Mode toggle 🌙☀️

### 🧑‍💼 Admin
- Add, Edit, or Delete questions
- Select:
  - Book (e.g., Genesis, Esther, John)
  - Question Type (MCQ / True-False / Written)
  - Time per Question
- Export all questions to CSV
- Beautiful dashboard with animations and data table

### 💾 Storage
- All data (questions, users, scores) saved in **LocalStorage**
- No backend required

---

## 🛠️ Tech Stack

- **React (Vite)** – Fast, modern frontend setup
- **Tailwind CSS** – Styling and responsive design
- **Framer Motion** – Smooth UI animations
- **Lucide React** – Icons
- **LocalStorage API** – Persistent data storage

---

## 🚀 Getting Started

### 1️⃣ Clone or Download
If you received a ZIP file, extract it and open the folder in VS Code.

Or clone via GitHub:
```bash
git clone https://github.com/Ohms-Gh/bible-quiz-app.git
cd bible-quiz-app

2️⃣ Install Dependencies
npm install


If Tailwind gives version errors:

npm install tailwindcss@3.4.14 postcss autoprefixer --save-dev

3️⃣ Run the App
npm run dev


Then open the local server URL (usually http://localhost:5173
).

📂 Folder Structure
src/
 ┣ components/
 ┃ ┣ Header.jsx
 ┃ ┣ QuestionCard.jsx
 ┃ ┗ Timer.jsx
 ┣ pages/
 ┃ ┣ Home.jsx
 ┃ ┣ Quiz.jsx
 ┃ ┣ Score.jsx
 ┃ ┣ History.jsx
 ┃ ┣ Admin.jsx
 ┃ ┗ Auth.jsx
 ┣ data/
 ┃ ┗ books.js  # List of 66 Bible books
 ┣ App.jsx
 ┣ main.jsx
 ┗ index.css

⚙️ Environment

Node.js >= 18

NPM >= 9

Vite >= 5

🌑 Dark Mode

A toggle is available in the header beside the Sign In button.
The selected mode (light/dark) is saved automatically.

💬 Social Sharing

Users can share their quiz scores via social platforms such as:

Facebook

WhatsApp

Twitter (X)

📊 Future Improvements

Online authentication (Firebase)

Real database backend

Global leaderboard

Audio questions and Bible reference links

🧡 Credits

Developed by [Bismark Asare][Ohms-Gh]
Built with ✨ React, Tailwind, and love for the Word of God ✝️

🕊️ License

This project is open for personal and educational use.
For commercial purposes, please contact the author.
