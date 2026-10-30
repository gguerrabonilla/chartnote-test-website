import { pageHtml } from "../../lib/page-html";
import { renderSpecialtyIndex } from "../../lib/render-audience.mjs";

const title = "Medical Specialties | Chartnote";
const description =
  "See how Chartnote, an AI medical scribe, helps each specialty document visits — from family medicine and emergency care to pediatrics and oncology.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/specialties" },
  openGraph: { title, description, url: "/specialties", images: ["/img/og.jpg"] },
};

export default function SpecialtiesPage() {
  return (
    <div
      id="__nuxt"
      dangerouslySetInnerHTML={{ __html: pageHtml(renderSpecialtyIndex()) }}
    />
  );
}
