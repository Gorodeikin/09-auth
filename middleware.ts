import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/profile", "/notes", "/settings"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const allCookies = req.cookies.getAll();
  console.log("All cookies:", allCookies);

  const { pathname } = req.nextUrl;

  if (PRIVATE_ROUTES.some(route => pathname.startsWith(route)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route)) && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
