import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the access token cookie
    response.cookies.set("access_token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
