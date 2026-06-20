import { NextResponse } from "next/server";

export async function GET() {
const clientKey =
process.env.TIKTOK_CLIENT_KEY;

const redirectUri =
"http://localhost:3000/auth/callback";

const scope =
"user.info.basic,video.upload";

const authUrl =
`https://www.tiktok.com/v2/auth/authorize/` +
`?client_key=${clientKey}` +
`&scope=${scope}` +
`&response_type=code` +
`&redirect_uri=${encodeURIComponent(
      redirectUri
    )}` +
`&state=gpxflow`;

return NextResponse.redirect(authUrl);
}
