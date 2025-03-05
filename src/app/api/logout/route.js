import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies helper

export async function POST() { //request in brackets not required??
  cookies().set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // Ensures immediate expiration
    sameSite: "lax",
  });
  
  return NextResponse.json({ success: true });
}
