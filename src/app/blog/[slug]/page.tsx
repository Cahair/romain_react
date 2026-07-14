
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// 1. Define specific function to fetch data
// This is used by both the page component and generateMetadata
async function getPost(slug: string) {
    // Simulate database call
    // const post = await db.post.findUnique({ where: { slug } });

    // Mock data for demonstration
    const post = {
        title: `Article sur ${slug}`,
        excerpt: `Découvrez tout ce qu'il faut savoir sur ${slug} dans cet article complet.`,
        tags: ['IA', 'Automation', 'Next.js'],
        updatedAt: new Date().toISOString(),
    };

    return post;
}

// 2. The generateMetadata function
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const post = await getPost(slug);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: post.title,
        description: post.excerpt,
        // Contenu factice : ne pas indexer tant que le blog n'est pas réel.
        robots: { index: false, follow: false },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [`/api/og?title=${post.title}`, ...previousImages],
            type: 'article',
            publishedTime: post.updatedAt,
            tags: post.tags,
        },
    };
}

export default async function Page({ params }: Props) {
    const post = await getPost(params.slug);

    return (
        <div className="container mx-auto py-12 px-4">
            <header className="mb-8">
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{post.title}</h1>
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            </header>
            <article className="prose lg:prose-xl">
                <p>Contenu de l'article ici...</p>
            </article>
            {/* Example JsonLd injection for this specific article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: post.title,
                        description: post.excerpt,
                        datePublished: post.updatedAt,
                    }),
                }}
            />
        </div>
    );
}
