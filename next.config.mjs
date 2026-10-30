/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
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
