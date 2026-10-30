import fs from "fs";
import path from "path";
import { audienceNav } from "../lib/audiences.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sourceDir = "/tmp/cn-pages";
const mirrorDir = path.join(root, "content/mirror");
const shellDir = path.join(root, "content/shell");
const publicDir = path.join(root, "public");

const pages = [
  "home",
  "about",
  "aiScribe",
  "baa",
  "copilot",
  "dictation",
  "downloads",
  "fairUse",
  "faq",
  "hipaa",
  "msa",
  "plans",
  "privacyPolicy",
  "security",
  "snippets",
  "teams",
  "termsOfUse",
  "voiceChart",
];

const navMap = {
  Plans: "/plans",
  Teams: "/teams",
  Downloads: "/downloads",
  FAQ: "/faq",
  "Voice Chart": "/voiceChart",
  "AI Scribe": "/aiScribe",
  Copilot: "/copilot",
  Dictation: "/dictation",
  Snippets: "/snippets",
  "Privacy and Security": "/hipaa",
};

function dropdown(label, icon, links) {
  const items = links
    .map(
      (link) =>
        `<div><a href="${link.href}" class="cui-dropdown-link-item">${link.label}</a></div>`
    )
    .join("");
  return `<div data-v-06ad16a2="" class="cui-dropdown-anchor floating"><div role="button" tabindex="0" data-variant="transparent" class="cui-dropdown cui-dropdown-floating floating leading-icon ${icon}"><span>${label}</span></div><div data-mode="floating" class="cui-dropdown-options lg floating"><div class="cui-dropdown-options-list"><div class="cui-dropdown-item-group">${items}</div></div></div></div>`;
}

function collapsedItems(label, icon, links) {
  const header = `<div><div class="cui-dropdown-header-item leading-icon ${icon}"><div class="cui-dropdown-header-item-text-wrapper">${label}</div></div></div>`;
  const items = links
    .map(
      (link) =>
        `<div><a href="${link.href}" class="cui-dropdown-link-item">${link.label}</a></div>`
    )
    .join("");
  return header + items;
}

function drawerSection(label, icon, links) {
  const items = links
    .map((link) => `<a data-v-06ad16a2="" href="${link.href}">${link.label}</a>`)
    .join(" ");
  return `<h4 data-v-06ad16a2="" class="typo-b1 leading-icon ${icon}">${label}</h4> ${items}`;
}

function footerList(label, links) {
  const items = links
    .map(
      (link) =>
        `<li data-v-4f2a702a=""><a data-v-4f2a702a="" href="${link.href}">${link.label}</a></li>`
    )
    .join("");
  return `<ul data-v-4f2a702a=""><li data-v-4f2a702a="" aria-level="5" class="header">${label}</li>${items}</ul> `;
}

function planCard(name, detail, priceHtml, note, includesLabel, features, cta, ctaClass) {
  const list = features
    .map(
      (feature) =>
        `<li data-v-5776114a="" data-v-4a4cc12c=""><img data-v-5776114a="" data-v-4a4cc12c="" src="/_nuxt/img/bullet_type2.5170b8c.png" alt=""> ${feature}</li>`
    )
    .join("");
  const button = cta.href
    ? `<a data-v-712e53b8="" data-v-5776114a="" class="landing-button cui-box-shadow bold ${ctaClass}" data-v-4a4cc12c="" href="${cta.href}"${cta.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${cta.label}</a>`
    : `<button data-v-712e53b8="" data-v-5776114a="" class="landing-button cui-box-shadow bold ${ctaClass}" data-v-4a4cc12c="">${cta.label}</button>`;
  return `<div data-v-5776114a="" data-plan-group="team" class="swiper-slide"><div data-v-4a4cc12c="" data-v-5776114a="" class="chartnote-showcase-box"><div data-v-5776114a="" data-v-4a4cc12c="" class="chartnote-plans-item"><h3 data-v-5776114a="" data-v-4a4cc12c="">${name}</h3> <h4 data-v-5776114a="" data-v-4a4cc12c="">${detail}</h4> ${button} <div data-v-5776114a="" data-v-4a4cc12c="" class="chartnote-plans-item-price">${priceHtml} <p data-v-5776114a="" data-v-4a4cc12c="">${note}</p></div> <div data-v-5776114a="" data-v-4a4cc12c="" class="includes">${includesLabel}</div> <ul data-v-5776114a="" data-v-4a4cc12c="">${list}</ul></div></div></div>`;
}

function insertOnce(html, marker, insertion, mode) {
  const index = html.indexOf(marker);
  if (index < 0) throw new Error("Missing marker: " + marker.slice(0, 80));
  if (html.indexOf(marker, index + marker.length) !== -1) {
    throw new Error("Ambiguous marker: " + marker.slice(0, 80));
  }
  if (mode === "before") return html.slice(0, index) + insertion + html.slice(index);
  if (mode === "replace") return html.slice(0, index) + insertion + html.slice(index + marker.length);
  throw new Error("bad mode");
}

function enhanceNav(html) {
  let next = html;
  next = next.replaceAll("HIPAA &amp; SOC 2 Certified.", "HIPAA compliant. SOC 2 Type II.");
  next = next.replace(/SOC 2 Type II certified/gi, "SOC 2 Type II");
  next = next.replaceAll("Chartnote 3.0", "Chartnote");
  next = next.replaceAll('href="/welcome?mode=signup"', 'href="https://chartnote.com/welcome?mode=signup"');
  next = next.replaceAll('href="/welcome"', 'href="https://chartnote.com/welcome"');

  for (const [label, href] of Object.entries(navMap)) {
    next = next.replaceAll(
      `<div class="cui-dropdown-simple-item">${label}</div>`,
      `<a href="${href}" class="cui-dropdown-link-item">${label}</a>`
    );
  }

  next = next.replace(
    '<div data-v-06ad16a2="" role="button" tabindex="0" class="cui-text-button cmr-4"><!---->Pricing</div>',
    '<a data-v-06ad16a2="" href="/plans" class="cui-text-button cmr-4">Pricing</a>'
  );
  next = next.replace(
    /<a data-v-06ad16a2="" href="#" class="drawer-icon-item">([\s\S]*?)Pricing/,
    '<a data-v-06ad16a2="" href="/plans" class="drawer-icon-item">$1Pricing'
  );

  const specialtyLinks = audienceNav("specialties");
  const segmentLinks = audienceNav("segments");
  const desktopMenus =
    dropdown("Specialties", "docs", specialtyLinks) + dropdown("Segments", "community", segmentLinks);

  const collapsedMarker = '<div data-v-06ad16a2="" class="collapsed-nav">';
  const collapsedAt = next.indexOf(collapsedMarker);
  if (collapsedAt < 0) throw new Error("collapsed nav missing");
  const expandedClose = next.lastIndexOf("</div>", collapsedAt);
  next = next.slice(0, expandedClose) + desktopMenus + next.slice(expandedClose);

  const collapsedInsertAt = next.indexOf(
    '</div></div></div><!----></div></div> <div data-v-06ad16a2="" role="button" data-variant="transparent" tabindex="0" class="cui-icon-button cml-4 drawer-button'
  );
  if (collapsedInsertAt < 0) throw new Error("collapsed menu end missing");
  const collapsedBlock =
    collapsedItems("Specialties", "docs", specialtyLinks) +
    collapsedItems("Segments", "community", segmentLinks);
  next = next.slice(0, collapsedInsertAt) + collapsedBlock + next.slice(collapsedInsertAt);

  const drawerMarker = '<div data-v-06ad16a2="" class="cui-dropdown-anchor default">';
  const drawerBlock =
    drawerSection("Specialties", "docs", specialtyLinks) +
    " " +
    drawerSection("Segments", "community", segmentLinks) +
    ' <div data-v-06ad16a2="" class="drawer-divider"></div> ';
  next = insertOnce(next, drawerMarker, drawerBlock, "before");

  const footerMarker =
    '<ul data-v-4f2a702a=""><li data-v-4f2a702a="" aria-level="5" class="header">Company</li>';
  next = insertOnce(
    next,
    footerMarker,
    footerList("Specialties", specialtyLinks) + footerList("Segments", segmentLinks),
    "before"
  );

  return next;
}

function addTeamPlans(html) {
  const price = (monthly, yearly) =>
    `<span data-v-5776114a="" data-v-4a4cc12c="" class="price"><span data-v-5776114a="" data-v-4a4cc12c="" class="regular" data-monthly="${monthly}" data-yearly="${yearly}">${monthly}</span></span>`;
  const team = planCard(
    "Team Max",
    "For teams of 2 to 50",
    price("$99.99/month", "$89.99/month"),
    "per clinician",
    "Includes",
    [
      "Unlimited AI Scribe notes.*",
      "Shared templates &amp; snippets.",
      "Shared notes across the team.",
      "Centralized billing.",
      "Admin tools to manage users.",
    ],
    { label: "Free Trial" },
    ""
  );
  const enterprise = planCard(
    "Enterprise",
    "For organizations with advanced security and support needs",
    "<span data-v-5776114a=\"\" data-v-4a4cc12c=\"\" class=\"price\"><span data-v-5776114a=\"\" data-v-4a4cc12c=\"\" class=\"regular\">Custom</span></span>",
    "annual agreement",
    "Includes",
    [
      "Dedicated support.",
      "Single sign-on (SSO).",
      "SOC 2 Type II compliance.",
      "Usage analytics &amp; reporting.",
      "Org-wide data retention &amp; auto-deletion periods.",
      "Centralized access management.",
    ],
    { label: "Contact Sales", href: "https://leads.chartnote.com/demo", external: true },
    "primary"
  );
  const marked = html.replaceAll(
    'class="swiper-slide',
    'data-plan-group="individual" class="swiper-slide'
  );
  const marker = '<div data-v-5776114a="" class="trial-disclaimer">';
  const at = marked.indexOf(marker);
  if (at < 0) throw new Error("trial disclaimer missing");
  const wrapperClose = marked.lastIndexOf("</div></div>", at);
  if (wrapperClose < 0) throw new Error("pricing wrapper close missing");
  return marked.slice(0, wrapperClose) + team + enterprise + marked.slice(wrapperClose);
}

function collectAssets(texts) {
  const assets = new Set();
  const re = /\/_nuxt\/[^"'()\s#?]+/g;
  for (const text of texts) {
    for (const match of text.matchAll(re)) {
      const asset = match[0].replace(/\\/g, "");
      if (asset.endsWith(".eot")) assets.add(asset);
      assets.add(asset);
    }
  }
  return [...assets];
}

async function download(url, dest) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buffer);
}

async function mapPool(items, limit, worker) {
  const queue = items.slice();
  const runners = Array.from({ length: limit }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(runners);
}

const styles = JSON.parse(fs.readFileSync(path.join(sourceDir, "all-styles.json"), "utf8"));
fs.mkdirSync(mirrorDir, { recursive: true });
fs.mkdirSync(shellDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "mirror.css"), styles.filter(Boolean).join("\n"));

const meta = {};
for (const name of pages) {
  const raw = fs.readFileSync(path.join(sourceDir, `${name}.html`), "utf8");
  let html = enhanceNav(raw);
  if (name === "plans") html = addTeamPlans(html);
  if (/SOC 2(?: Type II)? certified/i.test(html) || html.includes("Chartnote 3.0")) {
    throw new Error("Forbidden phrase left in " + name);
  }
  fs.writeFileSync(path.join(mirrorDir, `${name}.html`), html);
  const pageMeta = JSON.parse(fs.readFileSync(path.join(sourceDir, `${name}.meta.json`), "utf8"));
  meta[name] = pageMeta;
  console.log("page", name, html.length);
}

const home = fs.readFileSync(path.join(mirrorDir, "home.html"), "utf8");
const mainAt = home.indexOf("<main");
const footerAt = home.indexOf("<footer");
if (mainAt < 0 || footerAt < 0) throw new Error("shell markers missing");
fs.writeFileSync(path.join(shellDir, "prefix.html"), home.slice(0, mainAt));
fs.writeFileSync(path.join(shellDir, "suffix.html"), home.slice(footerAt));

fs.writeFileSync(path.join(root, "content/meta.json"), JSON.stringify(meta, null, 2));

const assetTexts = [
  fs.readFileSync(path.join(publicDir, "mirror.css"), "utf8"),
  ...pages.map((name) => fs.readFileSync(path.join(mirrorDir, `${name}.html`), "utf8")),
];
const assets = collectAssets(assetTexts);
console.log("assets", assets.length);
await mapPool(assets, 12, async (asset) => {
  const dest = path.join(publicDir, asset);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  await download("https://chartnote.com" + asset, dest);
});
await download("https://chartnote.com/favicon.ico", path.join(publicDir, "favicon.ico"));
await download("https://chartnote.com/css/fonts.css", path.join(publicDir, "css/fonts.css"));
await download("https://chartnote.com/img/og.jpg", path.join(publicDir, "img/og.jpg"));
console.log("done");
