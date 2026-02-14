'use client'

import { ArrowRight, Lock } from "lucide-react"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { useFormState } from "react-dom"
import { login } from "@/actions/loginAction"

const initialState = { success: false, message: "" }

function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <DottedGlowBackground />

      {/* Decorative gradient orb — more muted */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/15 blur-[120px]" />

      {/* Blurred + glass effect */}
      <form action={formAction} className="relative w-full max-w-md space-y-6 bg-white/5 p-10 rounded-3xl shadow-2xl shadow-purple-900/10 border border-white/10 backdrop-blur-lg">
        {/* Logo with icon */}
        <div className="text-center space-y-3">
          <h2 className="text-5xl font-black bg-linear-to-r from-purple-300 via-slate-300 to-indigo-300 bg-clip-text text-transparent animate-gradient">
            Kosh.AI
          </h2>
          <p className="text-white/50 text-sm font-medium">
            Secure your digital vault with your master key
          </p>
        </div>

        {/* Password input with icon */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            Master Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-300 transition-colors" />
            <input
              type="password"
              placeholder="Enter your master password"
              name="password"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/40 focus:ring-4 focus:ring-purple-500/5 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="group relative w-full py-4 px-6 bg-linear-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Access Vault
            <ArrowRight className="w-5 h-5" />
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {state.message && (
          <p className={`text-sm text-center ${state.success ? "text-green-400" : "text-red-400"}`}>
            {state.message}
          </p>
        )}
      </form>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  )
}

export default LoginForm