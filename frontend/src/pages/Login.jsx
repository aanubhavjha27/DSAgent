import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import toast from "react-hot-toast"
import { authurl } from "../utilities"
import useUserStore from "../store/useUserStore"

export default function Login() {
  const navigate = useNavigate()
  const setusername = useUserStore((state) => state.setusername)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${authurl}/auth/login`, form)
      localStorage.setItem("token", res.data.accessToken)
      setusername(res.data.username)
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      {/* grid bg */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />
      <div className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[400px] rounded-full z-0"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

      {/* navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-zinc-900">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">DSAgent</span>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">DSA Tutor</p>
        </div>
      </nav>

      {/* form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
            <p className="text-zinc-500 text-sm mb-8">Login to continue your practice</p>

            <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-zinc-400 text-sm">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required
                  className="bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-zinc-400 text-sm">Password</label>
                <input
                  type="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••" required
                  className="bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 outline-none transition-colors"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg text-sm transition-all mt-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                {loading ? "Logging in..." : "Login →"}
              </button>
            </form>

            <p className="text-zinc-500 text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sign up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}