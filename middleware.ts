import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";
import { cookies } from "next/headers";

const PRIVATE_ROUTES = ["/profile", "/notes", "/settings"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  if (!accessToken && refreshToken) {
    try {
      const { data, status } = await checkSessionServer(refreshToken);

      if (status === 200 && data?.accessToken && data?.refreshToken) {
        const res = NextResponse.next();

        res.cookies.set("accessToken", data.accessToken, {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        res.cookies.set("refreshToken", data.refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        return res;
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  }

  if (PRIVATE_ROUTES.some(route => pathname.startsWith(route)) && !accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route)) && accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
