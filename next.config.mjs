/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    // Envoi des photos de l'espace admin (15 Mo max, contrôlé dans src/lib/admin/images.js).
    serverActions: { bodySizeLimit: '16mb' },
  },
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
