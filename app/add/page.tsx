'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Sparkles, Upload, Tag, Loader2 } from "lucide-react"
import { createPost } from "@/actions/createPost"
import { useFormState, useFormStatus } from "react-dom"
import { useEffect, useRef } from "react"

function AddPage() {
  const initialState = { success: false, message: "" };
  const [state, formAction] = useFormState(createPost, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-30 text-white">
        <DottedGlowBackground />

        <div className="relative z-10 w-full max-w-3xl">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                Add to Kosh
              </h1>
            </div>
            <p className="max-w-lg text-base text-white/50">
              Create a new entry in your knowledge vault. Capture ideas, notes, and insights.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl sm:p-10">
            <form className="space-y-6" action={formAction} ref={formRef}>
              {/* Title Input */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Title
                </Label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 transition-colors group-focus-within:text-purple-400" />
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter a descriptive title..."
                    className="h-14 border-2 border-white/10 bg-white/5 pl-12 pr-4 text-base text-white placeholder-white/30 backdrop-blur-sm transition-all focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10"
                    name="title"
                  />
                </div>
              </div>

              {/* Content Textarea */}
              <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your content here... Share your thoughts, ideas, or knowledge."
                  className="min-h-50 resize-y border-2 border-white/10 bg-white/5 p-4 text-base text-white placeholder-white/30 backdrop-blur-sm transition-all focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10"
                />
              </div>

              {/* Tags Input (Optional Enhancement) */}
              <div className="space-y-3">
                <Label htmlFor="tags" className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Tags <span className="text-white/40">{`(Optional)`}</span>
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add tags separated by commas..."
                  className="h-12 border-2 border-white/10 bg-white/5 px-4 text-base text-white placeholder-white/30 backdrop-blur-sm transition-all focus-visible:border-purple-500/50 focus-visible:ring-4 focus-visible:ring-purple-500/10"
                  name="tags"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-white/10 bg-white/5 px-6 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
                <SubmitButton />
              </div>
            </form>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: "💡", text: "Use descriptive titles" },
              { icon: "🏷️", text: "Add relevant tags" },
              { icon: "✨", text: "Rich formatting supported" }
            ].map((tip, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm">{tip.icon}</span>
                <span className="text-xs text-white/50">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-8 text-sm font-semibold text-white cursor-pointer transition-all hover:from-purple-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ?
        (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (<>
          <Upload className="h-4 w-4 animate-bounce" />
          Add to Kosh
        </>)}
    </Button>
  )
}

export default AddPage