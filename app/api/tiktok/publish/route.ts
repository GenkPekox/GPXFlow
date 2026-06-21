import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const { data: profile } = await supabaseAdmin!
      .from("profiles")
      .select(
        "tiktok_access_token,tiktok_open_id"
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
      if (!profile?.tiktok_access_token) {
  return NextResponse.json({
    success: false,
    error: "TikTok token not found",
  });
}

console.log("ACCESS TOKEN:", profile.tiktok_access_token);
console.log("OPEN ID:", profile.tiktok_open_id);
console.log("VIDEO URL:", video.video_url);

if (!video?.video_url) {
  return NextResponse.json({
    success: false,
    error: "Video URL not found",
  });
}
const tiktokResponse = await fetch(
  "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${profile.tiktok_access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_info: {
        source: "PULL_FROM_URL",
        video_url: video.video_url,
      },
    }),
  }
);

const tiktokData =
  await tiktokResponse.json();

console.log(
  "TIKTOK RESPONSE:",
  tiktokData
);

    return NextResponse.json({
  success: true,
  tiktokData,
});
  } catch (error) {
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