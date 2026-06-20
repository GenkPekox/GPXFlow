import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { code, userId } = await req.json();

  // 1. Exchange code → access_token
  const response = await fetch(
    "https://open.tiktokapis.com/v2/oauth/token/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY || "",
        client_secret: process.env.TIKTOK_CLIENT_SECRET || "",
        code,
        grant_type: "authorization_code",
        redirect_uri:
          "https://gpxflow.vercel.app/auth/callback",
      }),
    }
  );

  const data = await response.json();

  console.log("TOKENS FROM TIKTOK:", data);
  console.log("TikTok response:", data);

  // 2. Simpan token ke Supabase
  if (data.access_token) {
    await supabaseAdmin!
      .from("profiles")
      .update({
        tiktok_access_token: data.access_token,
        tiktok_refresh_token: data.refresh_token,
        tiktok_open_id: data.open_id,
        tiktok_connected: true,
      })
      .eq("id", userId);
  }

  // 3. Return ke frontend
  return NextResponse.json(data);
}