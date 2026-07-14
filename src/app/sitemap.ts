import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://romain-kantzer.com';

    const routes = [
        '',
        '/about',
        '/services',
        '/services/agents',
        '/services/data',
        '/services/lead-gen',
        '/services/web-dev',
        '/services/workflows',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...routes];
}
