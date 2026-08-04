/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/services/web-dev',
        permanent: true,
      },
      // Exemple de redirection 301 (Ancien WordPress -> Nouveau Next.js)
      // {
      //   source: '/ancienne-page-wordpress',
      //   destination: '/nouvelle-page',
      //   permanent: true,
      // },
      // Exemple avec paramètres dynamiques
      // {
      //   source: '/old-blog/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
