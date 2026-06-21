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

    const response = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,display_name",
      {
        headers: {
          Authorization: `Bearer ${profile.tiktok_access_token}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  }
}