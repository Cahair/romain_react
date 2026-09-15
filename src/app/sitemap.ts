import { MetadataRoute } from 'next';
import { SERVICE_SLUGS } from '../lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://romain-kantzer.com';

    const routes = [
        '',
        '/services',
        ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
        '/about',
        '/contact',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route.startsWith('/services') ? 0.9 : 0.7,
    }));
}
