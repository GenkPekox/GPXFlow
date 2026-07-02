import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  try {
    const { videoId } =
  await request.json();

console.log(
  "VIDEO ID RECEIVED:",
  videoId
);
    const { data: profile } = await supabaseAdmin!
      .from("profiles")
      .select(
        "tiktok_access_token,tiktok_open_id"
      )
      .eq("tiktok_connected", true)
      .single();

    if (!profile?.tiktok_access_token) {
      return NextResponse.json({
        success: false,
        error: "TikTok token not found",
      });
    }

    const { data: video } = await supabaseAdmin!
  .from("video_url")
  .select("*")
  .eq("id", videoId)
  .single();

    if (!video?.video_url) {
      return NextResponse.json({
        success: false,
        error: "Video URL not found",
      });
    }

    console.log(
      "TOKEN STARTS WITH:",
      profile.tiktok_access_token.substring(0, 15)
    );

    console.log(
      "PROFILE ROW:",
      profile
    );

    console.log(
      "OPEN ID:",
      profile.tiktok_open_id
    );

    console.log(
      "VIDEO URL:",
      video.video_url
    );

    const videoResponse = await fetch(
      video.video_url
    );

    const videoBuffer =
      await videoResponse.arrayBuffer();

    console.log(
      "VIDEO SIZE:",
      videoBuffer.byteLength
    );

    console.log(
      "TOTAL CHUNKS:",
      1
    );

    console.log(
      "CHUNK SIZE:",
      videoBuffer.byteLength
    );

    console.log(
      "VIDEO BUFFER TYPE:",
      typeof videoBuffer
    );

    console.log(
      "READY FOR FILE_UPLOAD"
    );

    const tiktokResponse = await fetch(
      "https://open.tiktokapis.com/v2/post/publish/video/init/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${profile.tiktok_access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_info: {
            title:
              video.title || "GPXFlow Test",
            privacy_level: "SELF_ONLY",
            disable_duet: false,
            disable_comment: false,
            disable_stitch: false,
          },
          source_info: {
  source: "FILE_UPLOAD",
  video_size: videoBuffer.byteLength,
  chunk_size: videoBuffer.byteLength,
  total_chunk_count: 1,
},
        }),
      }
    );

    const tiktokData =
      await tiktokResponse.json();

      const uploadUrl =
  tiktokData?.data?.upload_url;

if (uploadUrl) {
  const uploadResponse = await fetch(
    uploadUrl,
    {
      method: "PUT",
      headers: {
        "Content-Type": "video/mp4",
        "Content-Range": `bytes 0-${
          videoBuffer.byteLength - 1
        }/${videoBuffer.byteLength}`,
      },
      body: Buffer.from(videoBuffer),
    }
  );

  console.log(
    "UPLOAD STATUS:",
    uploadResponse.status
  );

  const uploadText =
    await uploadResponse.text();

  console.log(
    "UPLOAD RESPONSE:",
    uploadText
  );
  console.log(
  "PUBLISH ID:",
  tiktokData.data.publish_id
);
await supabaseAdmin!
  .from("video_url")
  .update({
    tiktok_publish_id:
      tiktokData.data.publish_id,
    status: "published",
  })
  .eq("id", video.id);

console.log(
  "PUBLISH ID SAVED TO DB"
);
}

    console.log(
      "TIKTOK RESPONSE:",
      tiktokData
    );

    console.log(
      "TIKTOK STATUS:",
      tiktokResponse.status
    );

    return NextResponse.json({
  success: true,
  publishId:
    tiktokData.data.publish_id,
  videoUrl: video.video_url,
  tiktokData,
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