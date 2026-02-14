import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { createServerSupabase } from "@/lib/supabase-server"
import { notFound } from "next/navigation"
import { deletePost } from "@/actions/deletePost"
import ShareButton from "@/components/share-button"

interface DynamicNotesPageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicNotesPage({ params }: DynamicNotesPageProps) {
  const { slug } = await params

  const supabase = createServerSupabase()

  const { data: note, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();


  if (error || !note) {
    notFound()
  }

  const words = note.content.split(/\s+/).length
  const readingTime = Math.ceil(words / 200)


  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-24 text-white">
      <DottedGlowBackground />

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute top-20 left-1/4 z-0 h-100 w-100 rounded-full bg-purple-700/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 z-0 h-87.5 w-87.5 rounded-full bg-indigo-600/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dumps">
            <Button
              variant="ghost"
              className="gap-2 border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Notes
            </Button>
          </Link>

          <div className="flex gap-2">
            <ShareButton slug={slug} />
            {/* <Button
              variant="outline"
              size="icon"
              className="border-white/10 bg-white/5 text-white/70 backdrop-blur-sm hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300 cursor-pointer"
            >
              <Edit className="h-4 w-4" />
            </Button> */}
            <form action={async () => {
              "use server"
              await deletePost(note.id)
            }}>
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-red-500/30 hover:bg-red-500/10 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main Note Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
          <div className="space-y-4 p-8 sm:p-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {note.tags?.map((tag: string) => (
                <Badge
                  key={tag}
                  className="border-purple-500/30 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>


            {/* Title */}
            <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              {note.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(note.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Content */}
          <div className="p-8 sm:p-10">
            <div className="prose prose-invert max-w-none">
              <p className="whitespace-pre-line text-white/80">
                {note.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}