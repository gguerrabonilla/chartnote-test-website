export const metadata = {
  metadataBase: new URL("https://hub.chartnote.com"),
  title: {
    default: "Chartnote | AI Scribe & Clinical Documentation",
    template: "%s",
  },
  description:
    "Chartnote is an AI medical scribe and clinical documentation platform. Turn encounters into structured notes with dictation, templates, and a web EHR workflow.",
  openGraph: {
    siteName: "Chartnote",
    type: "website",
    images: ["/img/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/img/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap"
        />
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="stylesheet" href="/mirror.css" />
        <link rel="stylesheet" href="/hub.css" />
      </head>
      <body>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer />
        <script src="/hero-motion.js" defer />
        <script src="/hub.js" defer />
      </body>
    </html>
  );
}
