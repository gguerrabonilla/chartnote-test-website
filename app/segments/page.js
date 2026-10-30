import { pageHtml } from "../../lib/page-html";
import { renderSegmentIndex } from "../../lib/render-audience.mjs";

const title = "Healthcare Organizations | Chartnote";
const description =
  "Chartnote for solo practices, multi-specialty groups, hospitals, health systems, nursing homes, telehealth, and FQHCs.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/segments" },
  openGraph: { title, description, url: "/segments", images: ["/img/og.jpg"] },
};

export default function SegmentsPage() {
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: pageHtml(renderSegmentIndex()) }} />;
}
