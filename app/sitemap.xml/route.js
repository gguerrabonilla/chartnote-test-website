import { headers } from "next/headers";
import { specialties, segments } from "../../lib/audiences.mjs";
import { mirrorSlugs } from "../../lib/mirror";
import { isNoindexHost, publicOrigin } from "../../lib/search-hosts.mjs";

export const dynamic = "force-dynamic";

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapPaths() {
  return [
    "/",
    ...mirrorSlugs.map((slug) => `/${slug}`),
    "/specialties",
    ...specialties.map((item) => `/specialties/${item.slug}`),
    "/segments",
    ...segments.map((item) => `/segments/${item.slug}`),
  ];
}

function sitemapXml(origin) {
  const urls = sitemapPaths()
    .map((pathname) => {
      const priority = pathname === "/" ? "1" : "0.7";
      return [
        "<url>",
        `<loc>${xmlEscape(origin + pathname)}</loc>`,
        "<changefreq>weekly</changefreq>",
        `<priority>${priority}</priority>`,
        "</url>",
      ].join("");
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`;
}

export async function GET() {
  const host = (await headers()).get("host") || "";
  if (isNoindexHost(host)) {
    return new Response("Not found\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "private, no-store",
        Vary: "Host",
      },
    });
  }
  return new Response(sitemapXml(publicOrigin(host)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "private, no-store",
      Vary: "Host",
    },
  });
}
