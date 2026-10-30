import { notFound } from "next/navigation";
import { mirrorHtml, mirrorMetadata, mirrorSlugs } from "../../lib/mirror";

export function generateStaticParams() {
  return mirrorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!mirrorSlugs.includes(slug)) return {};
  return mirrorMetadata(slug, `/${slug}`);
}

export default async function MirrorPage({ params }) {
  const { slug } = await params;
  if (!mirrorSlugs.includes(slug)) notFound();
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: mirrorHtml(slug) }} />;
}
