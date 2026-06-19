import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const response = await fetch(
    "https://open.tiktokapis.com/v2/oauth/token/",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key:
          process.env.TIKTOK_CLIENT_KEY || "",
        client_secret:
          process.env.TIKTOK_CLIENT_SECRET || "",
        code,
        grant_type: "authorization_code",
        redirect_uri:
          "https://gpxflow.vercel.app/auth/callback",
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}