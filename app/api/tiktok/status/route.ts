import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
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
      .select(
        "id,title,tiktok_publish_id"
      )
      .not(
        "tiktok_publish_id",
        "is",
        null
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (
      !profile?.tiktok_access_token ||
      !video?.tiktok_publish_id
    ) {
      return NextResponse.json({
        success: false,
        error:
          "Missing token or publish id",
      });
    }

    console.log(
      "TOKEN EXISTS:",
      true
    );

    console.log(
      "OPEN ID:",
      profile.tiktok_open_id
    );

    console.log(
      "LATEST PUBLISH ID:",
      video.tiktok_publish_id
    );

    const statusResponse = await fetch(
      "https://open.tiktokapis.com/v2/post/publish/status/fetch/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${profile.tiktok_access_token}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          publish_id:
            video.tiktok_publish_id,
        }),
      }
    );

    const statusData =
      await statusResponse.json();

    console.log(
      "TIKTOK STATUS RESPONSE:",
      statusData
    );

    return NextResponse.json({
      success: true,
      statusData,
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