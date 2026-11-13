import { noindexHeaderRules } from "./lib/search-hosts.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Host-conditional so chartnote.com stays indexable if this build is served there.
  async headers() {
    return noindexHeaderRules();
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "leads.chartnote.com" }],
          destination: "/playbook/index.html",
        },
        { source: "/demo", destination: "/demo/index.html" },
        { source: "/acp2026", destination: "/acp2026/index.html" },
        { source: "/playbook", destination: "/playbook/index.html" },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/", permanent: false },
      { source: "/pricing", destination: "/plans", permanent: false },
      { source: "/specialties/family-medicine-clinic", destination: "/specialties/family-medicine", permanent: true },
      { source: "/specialties/internal-medicine-clinic", destination: "/specialties/internal-medicine", permanent: true },
      { source: "/specialties/family-medicine-hospital", destination: "/specialties/hospitalist", permanent: true },
      { source: "/specialties/internal-medicine-hospital", destination: "/specialties/hospitalist", permanent: true },
      { source: "/segments/fqhc", destination: "/segments/fqhcs", permanent: false },
    ];
  },
};

export default nextConfig;
