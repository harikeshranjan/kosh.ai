"use server"

import { createServerSupabase } from "@/lib/supabase-server";

export async function createPost(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const rawTags = (formData.get("tags") as string) || "";

    if (!title || !content) {
      return { success: false, message: "Title and content are required." };
    }

    const tags = rawTags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const embedRes = await fetch(`${process.env.MICROSERVICE_URL}/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `${title}\n\n${content}\n\nTags: ${tags.join(", ")}`
      })
    });

    if (!embedRes.ok) {
      return { success: false, message: "Failed to generate embedding." };
    }

    const { embedding } = await embedRes.json();

    const supabase = createServerSupabase();

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      tags,
      embedded_vector: embedding,
      slug
    });

    if (error) {
      return { success: false, message: "Failed to create post." };
    }

    return { success: true, message: "Post created successfully!" };

  } catch (err) {
    return { success: false, message: "Something went wrong." };
  }
}