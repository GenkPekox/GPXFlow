import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const now = new Date().toISOString();

  const { data: videos, error } = await supabaseAdmin!
    .from("video_url")
    .select("*")
    .eq("status", "scheduled")
    .lte("scheduled_at", now);

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  for (const video of videos || []) {
  await fetch("http://localhost:3000/api/tiktok/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId: video.id,
    }),
  });
}

return NextResponse.json({
  success: true,
  published: videos?.length || 0,
});
}