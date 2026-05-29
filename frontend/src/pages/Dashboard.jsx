import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import useUserStore from "../store/useUserStore"

export default function Dashboard() {
  const navigate = useNavigate()
  const username = useUserStore((state) => state.username)
  const clearusername = useUserStore((state) => state.clearusername)

  const handleLogout = () => {
    localStorage.removeItem("token")
    clearusername()
    navigate("/")
  }

  const cards = [
    {
      icon: "💬",
      title: "Free Practice",
      desc: "Paste any code or describe any problem. AI analyses it and gives you progressive hints without spoiling the solution.",
      cta: "Start chatting →",
      route: "/chat/free",
      gradient: "from-indigo-500 to-purple-500",
      border: "hover:border-indigo-500",
    },
    {
      icon: "📋",
      title: "Practice Questions",
      desc: "Choose from NeetCode 150, Blind 75, Striver's SDE, company-specific and pattern-based lists.",
      cta: "Browse questions →",
      route: "/practice",
      gradient: "from-purple-500 to-pink-500",
      border: "hover:border-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />
      <div className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[400px] rounded-full z-0"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)" }} />

      {/* navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-zinc-900">
        <div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">DSAgent</span>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">DSA Tutor</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm">Hey, <span className="text-white font-medium">{username}</span> 👋</span>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{username}</span>
          </h2>
          <p className="text-zinc-500 mb-14">What do you want to practice today?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(card.route)}
              className={`bg-zinc-900 border border-zinc-800 ${card.border} rounded-2xl p-8 cursor-pointer transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-5`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{card.desc}</p>
              <span className="text-indigo-400 text-sm font-medium">{card.cta}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}