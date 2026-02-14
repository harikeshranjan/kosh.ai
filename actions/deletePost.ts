"use server"

import { createServerSupabase } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function deletePost(id: string) {
  const supabase = createServerSupabase()

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error("Failed to delete post")
  }

  redirect("/dumps")
}