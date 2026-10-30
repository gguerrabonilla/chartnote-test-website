import { notFound } from "next/navigation";
import { segments } from "../../../lib/audiences.mjs";
import { pageHtml } from "../../../lib/page-html";
import { renderSegment } from "../../../lib/render-audience.mjs";

export function generateStaticParams() {
  return segments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = segments.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/segments/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/segments/${item.slug}`,
      images: ["/img/og.jpg"],
    },
  };
}

export default async function SegmentPage({ params }) {
  const { slug } = await params;
  const html = renderSegment(slug);
  if (!html) notFound();
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: pageHtml(html) }} />;
}
