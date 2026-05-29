<div align="center">

# DSAgent

### AI-Powered DSA Tutor

*Stop watching videos. Start thinking. Get hints, not answers — every single time.*

<br />

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-000000?style=for-the-badge&logo=python&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)

<br />

</div>

---

## 🎥 Demo Video

https://github.com/user-attachments/assets/2b6f0f20-5897-4158-b3a4-e9e08476ecf5

---

## 📸 Screenshots

<div align="center">

| 🏠 Landing Page | 

| <img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/c48e2318-a1b1-44f9-8055-f9f7e1ea4a28" />  |

  🔐Login

|<img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/f290dd21-9d3d-4564-a4b2-503f4ca0f6b9" />|

| 📊 Dashboard 

| 
<img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/4153ee0b-8b8a-4ec2-9ef2-d20995e618e2" /> | 

| 📋 Practice Questions |
|<img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/9880fd55-e15d-4f14-a73b-3feb2cf6a56f" />|
| 🗂️ Problems List |
|
<img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/9994e8df-c218-42bd-adbf-093ee81fc46c" />|
| 💬 AI Chat — Hint System |

| <img width="800" height="400" alt="Image" src="https://github.com/user-attachments/assets/f6a99b14-33c7-42fd-9945-ccc5cd0e6dd2" /> |

</div>

---

## ✨ Features

- 🧠 &nbsp;**Socratic AI Tutor** — powered by LLaMA 3.3 70B on Groq via LangGraph state machine, asks questions instead of giving answers
- 💡 &nbsp;**3 Progressive Hints** — each hint gets more specific, full solution only unlocks after 3 attempts
- 📋 &nbsp;**300+ Problems** — across 12 curated lists including NeetCode 150, Blind 75, Striver's SDE and more
- 🏢 &nbsp;**Company Lists** — Amazon, Google, Meta, Microsoft top interview questions
- 🧩 &nbsp;**Pattern Lists** — DP 50, Graph 40, Backtracking 20, Sliding Window 25, Two Pointers 30
- ⏱ &nbsp;**Configurable Timer** — set 5, 10, or 15 minute practice timers with nudge notifications
- 💬 &nbsp;**Free Practice Mode** — paste any code from any problem, AI analyses and guides you
- 🔐 &nbsp;**JWT Authentication** — secure login and signup with bcrypt password hashing
- 📊 &nbsp;**Session Tracking** — all code attempts saved per session with hint level history

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Zustand |
| **Backend** | Node.js, Express.js |
| **AI Service** | FastAPI, LangGraph, LangChain |
| **LLM** | LLaMA 3.3 70B via Groq |
| **Database** | PostgreSQL via Prisma ORM |
| **Auth** | JWT + bcryptjs |

---

## 🔄 How It Works

```
User selects a problem from the list
              ↓
Session created → AI explains the problem
              ↓
User attempts on LeetCode, pastes failing code
              ↓
Hint 1 → Timer starts (nudge, not answer)
              ↓
User tries again, pastes new code
              ↓
Hint 2 → Timer resets (more specific)
              ↓
User tries again, pastes new code
              ↓
Hint 3 → Timer resets (almost there)
              ↓
User tries again → Full Solution unlocked
```

---

## 📚 Problem Lists

| Category | Lists |
|----------|-------|
| 🔥 Popular | NeetCode 150, Blind 75, Striver's SDE Sheet |
| 🏢 Company | Amazon Top 50, Google Top 50, Meta Top 50, Microsoft Top 50 |
| 🧩 Pattern | Dynamic Programming 50, Graph 40, Backtracking 20, Sliding Window 25, Two Pointers 30 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL
- Groq API key → [console.groq.com](https://console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/aanubhavjha27/DSAgent.git
cd DSAgent
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/dsagent
JWT_SECRET=your_secret_key_here
PORT=3000
```

```bash
npx prisma migrate dev
npx prisma generate
npm run seed
node server.js
# API running at http://localhost:3000
```

### 3. AI Service Setup
```bash
cd auservice
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn langgraph langchain-groq python-dotenv
```

Create `auservice/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

```bash
uvicorn main:app --reload --port 8000
# AI service running at http://localhost:8000
```

### 4. Frontend Setup
```bash
cd frontend
npm install
```

Update `src/utilities.js`:
```js
export const authurl = "http://localhost:3000"
```

```bash
npm run dev
# App running at http://localhost:5173
```

---

## 📁 Project Structure

```
DSAgent/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Landing.jsx            # Introduction page
│       │   ├── Login.jsx              # Login page
│       │   ├── Signup.jsx             # Signup page
│       │   ├── Dashboard.jsx          # Main dashboard
│       │   ├── PracticeQuestions.jsx  # Lists page
│       │   ├── ProblemsList.jsx       # Problems in a list
│       │   └── Chat.jsx               # AI hint chat page
│       ├── store/
│       │   └── useUserStore.js        # Zustand global state
│       └── utilities.js               # API URL config
│
├── backend/
│   ├── server.js                      # All routes — auth, problems, sessions
│   └── prisma/
│       ├── schema.prisma              # DB schema
│       ├── migrations/                # DB migrations
│       └── seed.js                    # 300+ problems seed data
│
└── auservice/
    └── main.py                        # FastAPI + LangGraph hint engine
```

---

## 🌍 Environment Variables

### Backend `.env`
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default 3000) |

### AI Service `.env`
| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key |
| `GROQ_MODEL` | Model name (llama-3.3-70b-versatile) |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

Built with ❤️ by [Anubhav Jha](https://github.com/aanubhavjha27)

⭐ Star this repo if you found it useful!

</div>
