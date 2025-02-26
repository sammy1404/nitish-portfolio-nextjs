import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  // Get credentials from environment variables
  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (username === validUsername && password === validPassword) {
    // Create a server-side session (simplified)
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "true", { httpOnly: true, secure: true, path: "/" });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
