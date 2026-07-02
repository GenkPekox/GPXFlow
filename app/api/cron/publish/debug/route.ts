import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin!
    .from("video_url")
    .select("*")
    .eq("status", "scheduled")
    .lte("scheduled_at", now);

  return NextResponse.json({
    now,
    error,
    total: data?.length || 0,
    videos: data,
  });
}