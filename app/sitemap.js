import { specialties, segments } from "../lib/audiences.mjs";
import { mirrorSlugs } from "../lib/mirror";

export default function sitemap() {
  const base = "https://hub.chartnote.com";
  const paths = [
    "/",
    ...mirrorSlugs.map((slug) => `/${slug}`),
    "/specialties",
    ...specialties.map((item) => `/specialties/${item.slug}`),
    "/segments",
    ...segments.map((item) => `/segments/${item.slug}`),
  ];
  return paths.map((pathname) => ({
    url: base + pathname,
    changeFrequency: "weekly",
    priority: pathname === "/" ? 1 : 0.7,
  }));
}
