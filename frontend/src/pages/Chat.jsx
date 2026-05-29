import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { authurl } from "../utilities"

export default function Chat() {
  const { problemId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [problem, setProblem] = useState(null)
  const [hintLevel, setHintLevel] = useState(1)
  const [timer, setTimer] = useState(600)
  const [timerActive, setTimerActive] = useState(false)
  const bottomRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const startSession = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const res = await axios.post(`${authurl}/sessions`,
          { problemId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setSessionId(res.data.session.id)
        setProblem(res.data.problem)
        setMessages([{ role: "ai", content: res.data.firstMessage, hintLevel: null }])
      } catch (error) {
        console.error("Failed to start session", error)
      } finally {
        setLoading(false)
      }
    }
    startSession()
  }, [problemId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); setTimerActive(false); return 0 }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [timerActive])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    const settings = JSON.parse(localStorage.getItem("settings") || "{}")
    const duration = (settings.timerDuration || 10) * 60
    setTimer(duration)
    setTimerActive(true)
  }

  const formatTimer = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0")
    const sec = (s % 60).toString().padStart(2, "0")
    return `${m}:${sec}`
  }

  const handleSend = async () => {
    if (!code.trim() || !sessionId) return
    const userMessage = { role: "user", content: code, hintLevel }
    setMessages(prev => [...prev, userMessage])
    setCode("")
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${authurl}/sessions/${sessionId}/message`,
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessages(prev => [...prev, { role: "ai", content: res.data.response, hintLevel: res.data.hintLevel }])
      setHintLevel(res.data.nextHintLevel)
      resetTimer()
    } catch (error) {
      console.error("Failed to send message", error)
    } finally {
      setLoading(false)
    }
  }

  const hintLabel = (level) => {
    if (level === 1) return { label: "Hint 1", color: "text-blue-400 border-blue-800 bg-blue-950" }
    if (level === 2) return { label: "Hint 2", color: "text-yellow-400 border-yellow-800 bg-yellow-950" }
    if (level === 3) return { label: "Hint 3", color: "text-orange-400 border-orange-800 bg-orange-950" }
    if (level === 4) return { label: "Solution", color: "text-green-400 border-green-800 bg-green-950" }
    return { label: "", color: "" }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.02) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />

      {/* navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 border-b border-zinc-900 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">DSAgent</span>
          </div>
          <div className="w-px h-6 bg-zinc-800" />
          <span className="text-sm font-medium text-white">{problem?.name || "Loading..."}</span>
          {problem && (
            
              <a
              href={problem.link} target="_blank" rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-yellow-400 border border-zinc-800 hover:border-yellow-400 px-2 py-1 rounded-lg transition-colors"
              >LeetCode ↗
            </a>
          )}
        </div>

        <div className="flex items-center gap-4">
          {timerActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-sm font-mono font-bold px-3 py-1 rounded-lg border ${
                timer < 60
                  ? "text-red-400 border-red-900 bg-red-950"
                  : "text-indigo-400 border-indigo-900 bg-indigo-950"
              }`}
            >
              ⏱ {formatTimer(timer)}
            </motion.div>
          )}
          <div className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1 rounded-lg">
            {hintLevel <= 3 ? `Hint ${hintLevel} / 3` : "Solution available"}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-2xl flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              {msg.role === "ai" && msg.hintLevel && (
                <span className={`text-xs border px-2 py-0.5 rounded-full ${hintLabel(msg.hintLevel).color}`}>
                  {hintLabel(msg.hintLevel).label}
                </span>
              )}
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-zinc-500">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}

        {/* timer notification */}
        {timerActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-indigo-950 border border-indigo-900 text-indigo-300 text-xs px-5 py-2.5 rounded-full">
              ⏱ Timer running — try to solve it with the hint. If stuck, paste your updated code for the next hint.
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="relative z-10 px-6 py-4 border-t border-zinc-900 shrink-0">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-zinc-600 mb-2">
            Paste your code below — you'll get hints, not the solution
          </p>
          <div className="flex gap-3 items-end">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSend() }}
              placeholder="Paste your code here..."
              rows={5}
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none resize-none font-mono transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={loading || !code.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-zinc-700 mt-2">Ctrl + Enter to send</p>
        </div>
      </div>
    </div>
  )
}