import { headers } from "next/headers";
import { isNoindexHost, publicOrigin } from "../../lib/search-hosts.mjs";

export const dynamic = "force-dynamic";

function robotsBody(host) {
  if (isNoindexHost(host)) {
    return "User-agent: *\nDisallow: /\n";
  }
  const origin = publicOrigin(host);
  return `User-agent: *\nAllow: /\n\nHost: ${origin}\nSitemap: ${origin}/sitemap.xml\n`;
}

export async function GET() {
  const host = (await headers()).get("host") || "";
  return new Response(robotsBody(host), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "private, no-store",
      Vary: "Host",
    },
  });
}
