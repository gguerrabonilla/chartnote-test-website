import { pageHtml } from "../lib/page-html";

export const metadata = {
  title: "Page not found | Chartnote",
  description: "That Chartnote page is not available. Browse the product, specialties, or segments.",
};

export default function NotFound() {
  const main = `<main class="hub-main">
    <section class="hub-hero">
      <div class="hub-wrap hub-hero-copy">
        <p class="hub-kicker">Chartnote</p>
        <h1>That page is not on this site</h1>
        <p class="hub-lead">The product pages, specialty guides, and organization guides are linked below.</p>
        <div class="hub-actions">
          <a class="hub-btn hub-btn-primary" href="/">Home</a>
          <a class="hub-btn" href="/specialties">Specialties</a>
          <a class="hub-btn" href="/segments">Segments</a>
        </div>
      </div>
    </section>
  </main>`;
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: pageHtml(main) }} />;
}
