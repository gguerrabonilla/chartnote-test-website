import { notFound } from "next/navigation";
import { specialties } from "../../../lib/audiences.mjs";
import { pageHtml } from "../../../lib/page-html";
import { renderSpecialty } from "../../../lib/render-audience.mjs";

export function generateStaticParams() {
  return specialties.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = specialties.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/specialties/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/specialties/${item.slug}`,
      images: ["/img/og.jpg"],
    },
  };
}

export default async function SpecialtyPage({ params }) {
  const { slug } = await params;
  const html = renderSpecialty(slug);
  if (!html) notFound();
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: pageHtml(html) }} />;
}
