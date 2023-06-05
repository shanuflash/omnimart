import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session && (pathname === "/cart" || pathname === "/checkout")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // else if (session && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  return res;
}
