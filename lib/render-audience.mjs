import { specialties, segments } from "./audiences.mjs";

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkAttrs(href) {
  if (href.startsWith("http")) return ` href="${esc(href)}" target="_blank" rel="noopener noreferrer"`;
  return ` href="${esc(href)}"`;
}

function actions(primaryHref, primaryLabel, secondaryHref, secondaryLabel) {
  return `<div class="hub-actions">
    <a class="hub-btn hub-btn-primary"${linkAttrs(primaryHref)}>${esc(primaryLabel)}</a>
    <a class="hub-btn"${linkAttrs(secondaryHref)}>${esc(secondaryLabel)}</a>
  </div>`;
}

function detailMain(item, kind) {
  const base = kind === "specialty" ? "/specialties" : "/segments";
  const kindLabel = kind === "specialty" ? "Specialties" : "Segments";
  const otherHref = kind === "specialty" ? "/segments" : "/specialties";
  const otherLabel = kind === "specialty" ? "Segments" : "Specialties";
  const cards = item.helps
    .map(
      (card) => `<article class="hub-card">
        <h3>${esc(card.title)}</h3>
        <p>${esc(card.body)}</p>
      </article>`
    )
    .join("");
  const notes = item.notes.map((note) => `<li>${esc(note)}</li>`).join("");
  return `<main class="hub-main">
    <section class="hub-hero">
      <div class="hub-hero-bg" aria-hidden="true">
        <div class="hub-orb hub-orb-a"></div>
        <div class="hub-orb hub-orb-b"></div>
      </div>
      <div class="hub-wrap hub-hero-copy">
        <p class="hub-kicker"><a href="${base}">${kindLabel}</a></p>
        <h1>${esc(item.headline)}</h1>
        <p class="hub-lead">${esc(item.lead)}</p>
        ${actions(
          "https://chartnote.com/welcome?mode=signup",
          "Sign up for free",
          "https://leads.chartnote.com/demo",
          "Contact Sales"
        )}
        <p class="hub-disclaimer">No credit card required · Start free in minutes · Data not used for training</p>
      </div>
    </section>
    <section class="hub-section">
      <div class="hub-wrap">
        <h2>How Chartnote helps</h2>
        <p class="hub-intro">Chartnote is an AI medical scribe and documentation product. These are the parts of that product that matter for this work.</p>
        <div class="hub-grid">${cards}</div>
      </div>
    </section>
    <section class="hub-section hub-section-alt">
      <div class="hub-wrap hub-split">
        <div>
          <h2>What clinicians document here</h2>
          <ul class="hub-list">${notes}</ul>
        </div>
        <div class="hub-panel">
          <h2>In the chart you already use</h2>
          <p>${esc(item.workflow)}</p>
          <ul class="hub-links">
            <li><a href="/aiScribe">AI Scribe</a></li>
            <li><a href="/voiceChart">Voice Chart</a></li>
            <li><a href="/dictation">Dictation</a></li>
            <li><a href="/snippets">Snippets</a></li>
            <li><a href="/copilot">Copilot</a></li>
            <li><a href="/plans">Plans</a></li>
            <li><a href="/hipaa">Privacy and security</a></li>
          </ul>
        </div>
      </div>
    </section>
    <section class="hub-band">
      <div class="hub-wrap">
        <h2>Try Chartnote on a real note</h2>
        <p>Open a free account and run the next encounter through AI Scribe, or talk with sales about a team rollout. ${kindLabel} and ${otherLabel.toLowerCase()} stay separate so you can read the page that matches the work.</p>
        ${actions("https://chartnote.com/welcome?mode=signup", "Sign up for free", otherHref, `See ${otherLabel.toLowerCase()}`)}
      </div>
    </section>
  </main>`;
}

function indexMain(items, kind) {
  const base = kind === "specialty" ? "/specialties" : "/segments";
  const kindLabel = kind === "specialty" ? "Specialties" : "Segments";
  const otherHref = kind === "specialty" ? "/segments" : "/specialties";
  const otherLabel = kind === "specialty" ? "segments" : "specialties";
  const intro =
    kind === "specialty"
      ? "Each specialty page explains how Chartnote’s AI scribe, dictation, and templates fit that clinical work. Segments — the kind of organization — live in their own section."
      : "Each segment page explains how Chartnote fits that kind of organization, from a solo practice to a health system. Clinical specialties live in their own section.";
  const cards = items
    .map(
      (item) => `<a class="hub-index-card" href="${base}/${esc(item.slug)}">
        <h2>${esc(item.name)}</h2>
        <p>${esc(item.summary)}</p>
        <span>Read the page</span>
      </a>`
    )
    .join("");
  return `<main class="hub-main">
    <section class="hub-hero">
      <div class="hub-hero-bg" aria-hidden="true">
        <div class="hub-orb hub-orb-a"></div>
        <div class="hub-orb hub-orb-b"></div>
      </div>
      <div class="hub-wrap hub-hero-copy">
        <p class="hub-kicker">Chartnote</p>
        <h1>${kindLabel}</h1>
        <p class="hub-lead">${esc(intro)}</p>
        ${actions("/aiScribe", "See AI Scribe", otherHref, `Browse ${otherLabel}`)}
      </div>
    </section>
    <section class="hub-section">
      <div class="hub-wrap">
        <div class="hub-index-grid">${cards}</div>
      </div>
    </section>
  </main>`;
}

export function renderSpecialty(slug) {
  const item = specialties.find((entry) => entry.slug === slug);
  if (!item) return null;
  return detailMain(item, "specialty");
}

export function renderSegment(slug) {
  const item = segments.find((entry) => entry.slug === slug);
  if (!item) return null;
  return detailMain(item, "segment");
}

export function renderSpecialtyIndex() {
  return indexMain(specialties, "specialty");
}

export function renderSegmentIndex() {
  return indexMain(segments, "segment");
}
