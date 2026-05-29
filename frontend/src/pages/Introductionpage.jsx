import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Introductionpage() {
  const navigate = useNavigate()

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">

      {/* ── GRID BACKGROUND ── */}
      <div className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />

      {/* ── GLOW ── */}
      <div className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[500px] rounded-full z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)"
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-zinc-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          DSAgent
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-3"
        >
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-zinc-400 hover:text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-28 pb-20 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >

          {/* badge */}
          <motion.div variants={fadeUp}>
            <span className="text-xs font-medium bg-indigo-950 border border-indigo-800 text-indigo-300 px-4 py-1.5 rounded-full">
              🧠 AI-Powered DSA Practice
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl font-bold leading-tight tracking-tight"
          >
            Stop watching videos.
            <br />
            <span
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Start thinking.
            </span>
          </motion.h1>

          {/* subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-zinc-400 text-lg max-w-xl leading-relaxed"
          >
            DSA Tutor acts like a Socratic mentor — it never gives you the answer.
            It asks the right questions until you figure it out yourself.
          </motion.p>

          {/* cta buttons */}
          <motion.div variants={fadeUp} className="flex gap-4 mt-2">
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Start Practicing Free →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-8 py-3 rounded-xl transition-all cursor-pointer"
            >
              Login
            </button>
          </motion.div>

        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-zinc-500 text-sm">Four steps to actually learning DSA</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "01", title: "Pick a problem", desc: "Choose from NeetCode 150, Blind 75, company lists and more", icon: "📋" },
            { step: "02", title: "Attempt it", desc: "Go to LeetCode, try to solve it yourself first", icon: "💻" },
            { step: "03", title: "Paste your code", desc: "Stuck? Paste your failing code in the chat", icon: "📋" },
            { step: "04", title: "Get hints not answers", desc: "AI nudges you in the right direction without spoiling it", icon: "🧠" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-800 transition-colors"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-xs text-indigo-400 font-mono mb-2">{item.step}</div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
          <p className="text-zinc-500 text-sm">Built for serious DSA prep</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "3 Progressive Hints", desc: "Each hint gets more specific. You only unlock the next one after trying.", icon: "💡", color: "from-indigo-500 to-purple-500" },
            { title: "12 Curated Lists", desc: "NeetCode 150, Blind 75, Striver's SDE, company-specific and pattern lists.", icon: "📚", color: "from-purple-500 to-pink-500" },
            { title: "Socratic AI Tutor", desc: "Powered by Groq + LangGraph. Asks questions instead of giving answers.", icon: "🤖", color: "from-pink-500 to-rose-500" },
            { title: "Built-in Timer", desc: "Set 5, 10, or 15 minute timers. Gives you a nudge when time is up.", icon: "⏱", color: "from-amber-500 to-orange-500" },
            { title: "Free Practice Mode", desc: "Paste any code from any problem. AI analyses and guides you.", icon: "💬", color: "from-teal-500 to-cyan-500" },
            { title: "Progress Tracking", desc: "Track which problems you've attempted and which hints you needed.", icon: "📈", color: "from-green-500 to-emerald-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-lg mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LISTS SECTION ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold mb-3">300+ problems across 12 lists</h2>
          <p className="text-zinc-500 text-sm">Every major list, all in one place</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "NeetCode 150", color: "bg-indigo-950 border-indigo-800 text-indigo-300" },
            { name: "Blind 75", color: "bg-purple-950 border-purple-800 text-purple-300" },
            { name: "Striver's SDE", color: "bg-pink-950 border-pink-800 text-pink-300" },
            { name: "Amazon Top 50", color: "bg-amber-950 border-amber-800 text-amber-300" },
            { name: "Google Top 50", color: "bg-blue-950 border-blue-800 text-blue-300" },
            { name: "Meta Top 50", color: "bg-cyan-950 border-cyan-800 text-cyan-300" },
            { name: "Microsoft Top 50", color: "bg-teal-950 border-teal-800 text-teal-300" },
            { name: "DP 50", color: "bg-green-950 border-green-800 text-green-300" },
            { name: "Graph 40", color: "bg-emerald-950 border-emerald-800 text-emerald-300" },
            { name: "Backtracking 20", color: "bg-rose-950 border-rose-800 text-rose-300" },
            { name: "Sliding Window 25", color: "bg-orange-950 border-orange-800 text-orange-300" },
            { name: "Two Pointers 30", color: "bg-violet-950 border-violet-800 text-violet-300" },
          ].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`text-xs font-medium border px-4 py-2 rounded-full ${item.color}`}
            >
              {item.name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-indigo-950 to-zinc-900 border border-indigo-800 rounded-3xl p-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to actually
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> learn DSA?</span>
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Stop relying on solutions. Start building intuition. Your next interview will thank you.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Start Practicing Free →
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-zinc-900 px-8 py-6 text-center">
        <p className="text-zinc-600 text-xs">Built for developers who want to actually learn, not just memorize.</p>
      </footer>

    </div>
  )
}