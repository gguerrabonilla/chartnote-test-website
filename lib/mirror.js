import fs from "fs";
import path from "path";
import meta from "../content/meta.json";

const overrides = {
  plans: {
    title: "Plans | Chartnote",
    meta: "Compare Chartnote Basic, Pro, Max, Team Max, and Enterprise for AI medical scribing and clinical documentation.",
  },
  security: {
    title: "Using AI responsibly | Chartnote",
    meta: "How Chartnote safeguards health information with HIPAA compliance, encryption, and an independent SOC 2 Type II examination.",
  },
};

export const mirrorSlugs = Object.keys(meta).filter((name) => name !== "home");

export function mirrorHtml(name) {
  return fs.readFileSync(path.join(process.cwd(), "content/mirror", `${name}.html`), "utf8");
}

export function mirrorMetadata(name, pathname) {
  const base = meta[name];
  const over = overrides[name] || {};
  const title = over.title || base.title;
  const description = over.meta || base.meta;
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      url: pathname,
      images: ["/img/og.jpg"],
    },
  };
}
