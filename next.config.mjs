/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return {
      beforeFiles: [
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
      { source: "/specialties/family-medicine", destination: "/specialties/family-medicine-clinic", permanent: false },
      { source: "/specialties/internal-medicine", destination: "/specialties/internal-medicine-clinic", permanent: false },
      { source: "/segments/fqhc", destination: "/segments/fqhcs", permanent: false },
    ];
  },
};

export default nextConfig;
