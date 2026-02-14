export const dynamic = "force-dynamic"

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Calendar, Tag, FileText } from "lucide-react"
import Link from "next/link"
import { createServerSupabase } from "@/lib/supabase-server"

interface ResultPageProps {
  searchParams: Promise<{
    query?: string
  }>
}

async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams
  const supabase = createServerSupabase()

  const query = params.query || ""

  let notes: any[] = []

  if (query) {
    const embedRes = await fetch(
      `${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/embed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      }
    )

    const { embedding } = await embedRes.json()

    const { data, error } = await supabase.rpc("match_posts", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 10,
    })

    if (error) {
      throw new Error("Vector search failed")
    }

    notes = data || []
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-24 text-white">
      <DottedGlowBackground />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400">
          Results for "{query}"
        </h1>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/note/${note.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-white/10"
            >
              <h3 className="mb-3 text-lg font-bold text-white group-hover:text-purple-300">
                {note.title}
              </h3>

              <p className="mb-4 line-clamp-3 text-sm text-white/50">
                {note.content}
              </p>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(note.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{note.content.split(/\s+/).length} words</span>
                </div>

                {note.tags?.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{note.tags[0]}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="mt-20 text-center text-white/50">
            No matches found.
          </div>
        )}
      </div>
    </main>
  )
}

export default ResultPage