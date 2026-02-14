export const dynamic = "force-dynamic"

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Tag, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { createServerSupabase } from "@/lib/supabase-server"

async function DumpsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const supabase = createServerSupabase()

  // Pagination Setup
  const currentPage = Number(params.page) || 1
  const pageSize = 10
  const from = (currentPage - 1) * pageSize
  const to = from + pageSize - 1

  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    throw new Error("Failed to fetch posts")
  }

  const notes = posts ?? []
  const totalNotes = count ?? 0
  const totalPages = Math.ceil(totalNotes / pageSize)

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-24 text-white">
      <DottedGlowBackground />

      <div className="pointer-events-none absolute top-20 left-1/4 z-0 h-100 w-100 rounded-full bg-purple-700/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 z-0 h-87.5 w-87.5 rounded-full bg-indigo-600/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              All Notes
            </h1>
            <p className="text-sm text-white/40">
              {totalNotes} {totalNotes === 1 ? "Note" : "Notes"} in your vault
            </p>
          </div>

          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
            <Input
              type="text"
              placeholder="Search notes..."
              className="h-12 border-2 border-white/10 bg-white/5 pl-12 pr-4 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-all focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/note/${note.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <h3 className="mb-3 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-purple-300">
                {note.title}
              </h3>

              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/50">
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
                    <span className="line-clamp-1">{note.tags[0]}</span>
                    {note.tags.length > 1 && (
                      <span className="text-white/30">
                        +{note.tags.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-indigo-500/5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {/* Previous */}
            <Link
              href={`/dumps?page=${currentPage - 1}`}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            >
              <Button
                variant="outline"
                className="h-10 rounded-lg border-white/10 bg-white/5 px-4 text-sm text-white/70 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Previous
              </Button>
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link key={page} href={`/dumps?page=${page}`}>
                  <Button
                    variant="outline"
                    className={`h-10 w-10 rounded-lg border-white/10 text-sm backdrop-blur-sm transition-all ${page === currentPage
                      ? "border-purple-500/50 bg-purple-500/20 text-white"
                      : "bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Next */}
            <Link
              href={`/dumps?page=${currentPage + 1}`}
              className={
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            >
              <Button
                variant="outline"
                className="h-10 rounded-lg border-white/10 bg-white/5 px-4 text-sm text-white/70 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Next
              </Button>
            </Link>
          </div>
        )}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-white/5 p-6 backdrop-blur-sm">
              <FileText className="h-12 w-12 text-white/30" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white/70">
              No notes yet
            </h3>
            <p className="mb-6 text-sm text-white/40">
              Start building your knowledge vault
            </p>
            <Link href="/add">
              <Button className="bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Note
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default DumpsPage