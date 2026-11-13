/**
 * Hosts that duplicate chartnote.com and must stay out of search indexes.
 * Patterns are regex sources. Next.js anchors them as ^pattern$ when matching
 * header `has` conditions, and isNoindexHost does the same.
 * chartnote.com and www.chartnote.com do not match.
 */
export const NOINDEX_HOST_PATTERNS = [
  "hub\\.chartnote\\.com",
  "leads\\.chartnote\\.com",
  ".+\\.vercel\\.app",
];

export const NOINDEX_ROBOTS_TAG = "noindex, nofollow";

export function hostnameFromHostHeader(hostHeader) {
  const first = String(hostHeader || "").split(",")[0].trim().toLowerCase();
  if (!first) return "";
  if (first.startsWith("[")) {
    const end = first.indexOf("]");
    return end === -1 ? first : first.slice(1, end);
  }
  return first.replace(/:\d+$/, "");
}

export function isNoindexHost(hostHeader) {
  const hostname = hostnameFromHostHeader(hostHeader);
  if (!hostname) return false;
  return NOINDEX_HOST_PATTERNS.some((pattern) => new RegExp(`^${pattern}$`).test(hostname));
}

export function publicOrigin(hostHeader) {
  const hostname = hostnameFromHostHeader(hostHeader);
  return `https://${hostname || "chartnote.com"}`;
}

export function noindexHeaderRules() {
  return NOINDEX_HOST_PATTERNS.map((value) => ({
    source: "/:path*",
    has: [{ type: "host", value }],
    headers: [{ key: "X-Robots-Tag", value: NOINDEX_ROBOTS_TAG }],
  }));
}
