import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import axios from "axios"
import toast from "react-hot-toast"
import { authurl } from "../utilities"
import useUserStore from "../store/useUserStore"

export default function Signup() {
  const navigate = useNavigate()
  const setusername = useUserStore((state) => state.setusername)
  const [form, setForm] = useState({ username: "", email: "", password: "", reconfirm: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password || !form.reconfirm) {
      toast.error("All fields are required"); return
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters"); return
    }
    if (form.password !== form.reconfirm) {
      toast.error("Passwords don't match"); return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${authurl}/auth/signup`, form)
      localStorage.setItem("token", res.data.accessToken)
      setusername(res.data.username)
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">

      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px"
      }} />
      <div className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[400px] rounded-full z-0"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

      <nav className="relative z-10 flex justify-between items-center px-8 py-5 border-b border-zinc-900">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">DSAgent</span>
          <p className="text-zinc-600 text-xs tracking-widest uppercase">DSA Tutor</p>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-1">Create account</h1>
            <p className="text-zinc-500 text-sm mb-8">Start your DSA journey today</p>

            <div className="flex flex-col gap-5">
              {[
                { label: "Username", name: "username", type: "text", placeholder: "yourname" },
                { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                { label: "Password", name: "password", type: "password", placeholder: "min 8 characters" },
                { label: "Confirm Password", name: "reconfirm", type: "password", placeholder: "••••••••" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm">{field.label}</label>
                  <input
                    type={field.type} name={field.name}
                    value={form[field.name]} onChange={handleChange}
                    placeholder={field.placeholder}
                    className="bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-white text-sm placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit} disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg text-sm transition-all mt-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </div>

            <p className="text-zinc-500 text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">Login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}