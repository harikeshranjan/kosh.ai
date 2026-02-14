'use client'

import { Button } from "@/components/ui/button"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { useRouter } from "next/navigation"
import { useState } from "react"

function HomePage() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    router.push(`/results?query=${encodeURIComponent(query)}`)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 text-white">
      <DottedGlowBackground />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Kosh<span className="text-white/90">AI</span>
          </h1>
          <p className="max-w-md text-center text-base text-white/50">
            Your intelligent knowledge vault. Search, discover, and unlock
            insights instantly.
          </p>
        </div>

        {/* Search Form */}
        <form className="flex w-full flex-col items-center gap-4" onSubmit={handleSearch}>
          <h2 className="text-lg font-medium text-white/70">
            Search in your Kosh
          </h2>

          <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-purple-500/10 backdrop-blur-md transition-all duration-300 focus-within:border-purple-500/50 focus-within:shadow-purple-500/20 font-medium text-lg">
            <input
              type="text"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
            />
            <Button
              type="submit"
              className="rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-6 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer "
            >
              Search
            </Button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Recent", "Bookmarks", "Trending", "Collections"].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/50 transition-colors duration-200 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white/80"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[120px]" />
    </main>
  )
}

export default HomePage