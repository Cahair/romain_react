/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    // Envoi des photos de l'espace admin (8 Mo max, contrôlé dans src/lib/admin/posts.js).
    serverActions: { bodySizeLimit: '10mb' },
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
