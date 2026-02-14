"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { toast } from "sonner"

export default function ShareButton({ slug }: { slug: string }) {
  const handleShare = async () => {
    const url = `${window.location.origin}/note/${slug}`
    await navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="icon"
      className="border-white/10 bg-white/5 text-white/70 backdrop-blur-sm hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  )
}