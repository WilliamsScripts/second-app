import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    // If no access token, redirect to main app's login
    if (!accessToken) {
      const mainAppUrl =
        process.env.NEXT_PUBLIC_MAIN_APP_URL || "http://localhost:3000";
      const redirectUrl = `${mainAppUrl}/login?redirect=${encodeURIComponent(
        req.nextUrl.toString()
      )}`;
      return NextResponse.redirect(redirectUrl);
    }

    // Verify the token with Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // If token is invalid or user not found, redirect to main app's login
    if (error || !user) {
      const mainAppUrl =
        process.env.NEXT_PUBLIC_MAIN_APP_URL || "http://localhost:3000";
      const redirectUrl = `${mainAppUrl}/login?redirect=${encodeURIComponent(
        req.nextUrl.toString()
      )}`;
      return NextResponse.redirect(redirectUrl);
    }

    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to main app's login
    const mainAppUrl =
      process.env.NEXT_PUBLIC_MAIN_APP_URL || "http://localhost:3000";
    const redirectUrl = `${mainAppUrl}/login?redirect=${encodeURIComponent(
      req.nextUrl.toString()
    )}`;
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (auth API endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|public).*)",
  ],
};
