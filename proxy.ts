import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const auth = request.cookies.get("kosh_auth");

  if (!auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dumps/:path*", "/notes/:path*", "/settings/:path*", "/add/:path*", "/home/:path*"],
}