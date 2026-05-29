import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import { authurl } from "../utilities"

export default function ProblemsList() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${authurl}/lists/${slug}/problems`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setData(res.data)
      } catch (error) {
        console.error("Failed to fetch problems", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProblems()
  }, [slug])

  const difficultyColor = (d) => {
    if (d === "Easy") return "text-green-400"
    if (d === "Medium") return "text-yellow-400"
    if (d === "Hard") return "text-red-400"
  }

  const filtered = data?.problems.filter(p =>
    filter === "All" ? true : p.difficulty === filter
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
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-sm font-medium">{data?.name}</span>
          <button
            onClick={() => navigate("/practice")}
            className="text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-14 w-full">
        {loading ? (
          <div className="text-zinc-600 text-sm">Loading problems...</div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h1 className="text-4xl font-bold mb-2">{data?.name}</h1>
              <p className="text-zinc-500 text-sm">{data?.totalProblems} problems</p>
            </motion.div>

            {/* filters */}
            <div className="flex gap-2 mb-8">
              {["All", "Easy", "Medium", "Hard"].map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={
                    filter === d
                      ? "px-4 py-1.5 rounded-lg text-sm cursor-pointer bg-indigo-600 text-white"
                      : "px-4 py-1.5 rounded-lg text-sm cursor-pointer bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  }
                >
                  {d}
                </button>
              ))}
            </div>

            {/* problems */}
            <div className="flex flex-col gap-2">
              {filtered.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="flex items-center justify-between bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-6 py-4 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-700 text-sm w-6">{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                        {problem.name}
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5">{problem.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${difficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-zinc-500 hover:text-yellow-400 border border-zinc-800 hover:border-yellow-400 px-2 py-1 rounded-lg transition-colors"
                      >
                      LeetCode ↗
                    </a>
                    <button
                      onClick={() => navigate(`/chat/${problem.id}`)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Practice
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}