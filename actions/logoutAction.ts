'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("kosh_auth");

  redirect("/");
}

export default logoutAction