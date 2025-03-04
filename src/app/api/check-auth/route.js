import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const authCookie = cookies().get("auth");

  if (!authCookie || authCookie.value !== "true") {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
