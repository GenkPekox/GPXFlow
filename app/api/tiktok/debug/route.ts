import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: profile } = await supabaseAdmin!
      .from("profiles")
      .select("tiktok_access_token")
      .eq("tiktok_connected", true)
      .single();

    if (!profile?.tiktok_access_token) {
      return NextResponse.json({
        error: "No token",
      });
    }

    return NextResponse.json({
      success: true,
      access_token: profile.tiktok_access_token,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}