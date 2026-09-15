/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Ancienne page unique « Développement web » → catalogue des services.
      {
        source: '/services/web-dev',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
