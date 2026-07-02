import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;

  const redirectUri =
    "https://gpxflow.vercel.app/auth/callback";

  // ✅ scope yang benar untuk Direct Post
  const scope =
    "user.info.basic,video.upload,video.publish";

  // PKCE
  const codeVerifier = crypto
    .randomBytes(32)
    .toString("base64url");

  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  const authUrl =
    `https://www.tiktok.com/v2/auth/authorize/` +
    `?client_key=${clientKey}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=gpxflow` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("tiktok_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true, // ⚠️ penting di production (Vercel)
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}