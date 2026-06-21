import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const { data: profile } = await supabaseAdmin!
      .from("profiles")
      .select(
        "tiktok_access_token,tiktok_open_id,tiktok_connected"
      )
      .eq("tiktok_connected", true)
      .single();

    const { data: video } = await supabaseAdmin!
      .from("video_url")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    return NextResponse.json({
      success: true,
      profile,
      video,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}