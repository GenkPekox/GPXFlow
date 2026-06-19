import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    client_key: process.env.TIKTOK_CLIENT_KEY,
    secret_length:
      process.env.TIKTOK_CLIENT_SECRET?.length,
  });
}