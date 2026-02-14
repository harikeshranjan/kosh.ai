'use server'

import LoginForm from "@/components/login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("kosh_auth");

  if (authCookie?.value === "authenticated") {
    redirect("/home");
  }

  return <LoginForm />
}
