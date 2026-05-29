import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { authurl } from "../utilities"

export default function PracticeQuestions() {
  const navigate = useNavigate()
  const [lists, setLists] = useState({ popular: [], company: [], pattern: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${authurl}/lists`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setLists(res.data)
      } catch (error) {
        console.error("Failed to fetch lists", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLists()
  }, [])

  const Section = ({ title, emoji, lists, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-14"
    >
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span>{emoji}</span>{title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list, i) => (
          <motion.div
            key={list.id}
            whileHover={{ y: -3 }}
            onClick={() => navigate(`/practice/${list.slug}`)}
            className="bg-zinc-900 border border-zinc-800 hover:border-indigo-500 rounded-xl p-6 cursor-pointer transition-all"
          >
            <h3 className="font-semibold text-white mb-1">{list.name}</h3>
            <p className="text-zinc-500 text-xs mb-4 leading-relaxed">{list.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs">{list._count.problems} problems</span>
              <span className="text-indigo-400 text-xs">View →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />

      {/* navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-zinc-900">
        <div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">DSAgent</span>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">DSA Tutor</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          ← Dashboard
        </button>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-14 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Practice Questions</h1>
          <p className="text-zinc-500">Choose a list and start practicing with AI hints</p>
        </motion.div>

        {loading ? (
          <div className="text-zinc-600 text-sm">Loading lists...</div>
        ) : (
          <>
            <Section title="Popular Lists" emoji="🔥" lists={lists.popular} delay={0.1} />
            <Section title="Company Based" emoji="🏢" lists={lists.company} delay={0.2} />
            <Section title="Pattern Based" emoji="🧩" lists={lists.pattern} delay={0.3} />
          </>
        )}
      </div>
    </div>
  )
}