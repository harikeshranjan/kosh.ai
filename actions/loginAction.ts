'use server'

import { cookies } from "next/headers"
import bcrypt from "bcrypt"

export async function login(
  prevState: { success: boolean; message: string },
  form: FormData
) {
  const hash = process.env.MASTER_PASSWORD!
  const password = form.get("password") as string;

  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    return {
      success: false,
      message: "Invalid master password"
    }
  }

  (await cookies()).set("kosh_auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  })

  return {
    success: true,
    message: "Authenticated"
  }
}