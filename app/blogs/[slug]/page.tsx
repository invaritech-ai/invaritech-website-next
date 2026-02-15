import { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Script from "next/script";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const imageUrl = post.coverImage || "/og-image.webp";

    return {
        title: `${post.title} - INVARITECH Blog`,
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author.name }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://www.invaritech.ai/blogs/${post.slug}/`,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            tags: post.tags,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
        alternates: {
            canonical: `https://www.invaritech.ai/blogs/${post.slug}/`,
        },
    };
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

function generateArticleSchema(post: {
    title: string;
    excerpt: string;
    content: string;
    author: { name: string; role: string };
    publishedAt: string;
    coverImage?: string;
    slug: string;
}) {
    const baseUrl = "https://www.invaritech.ai";
    const url = `${baseUrl}/blogs/${post.slug}/`;
    const imageUrl = post.coverImage
        ? `${baseUrl}${post.coverImage}`
        : `${baseUrl}/og-image.webp`;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
        },
        publisher: {
            "@type": "Organization",
            name: "INVARITECH",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
                width: 512,
                height: 512,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        url: url,
        articleSection: "Technology",
        keywords: post.title,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const articleSchema = generateArticleSchema(post);

    return (
        <>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <main className="min-h-screen bg-[#030305] relative overflow-hidden">
                <ArtisticBackground />

                <article className="relative z-10 pt-32 pb-24 px-6 md:px-0">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Area */}
                        <header className="mb-24 border-b border-white/10 pb-12">
                            {/* Meta Top Bar */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 font-mono text-xs text-muted-foreground uppercase tracking-widest border-l-2 border-primary/50 pl-4">
                                <Link
                                    href="/blogs/"
                                    className="flex items-center gap-2 hover:text-white transition-colors group"
                                >
                                    <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                                    Return to Archive
                                </Link>
                                <div className="flex gap-6">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="size-3" />
                                        {formatDate(post.publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="size-3" />
                                        {estimateReadingTime(post.content)} MIN READ
                                    </span>
                                </div>
                            </div>

                             {/* Eyebrow */}
                            <div className="mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">
                                    INTELLIGENCE // STRATEGY
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] text-white mix-blend-difference">
                                <TextEffect per="word" preset="slide">
                                    {post.title}
                                </TextEffect>
                            </h1>

                            {/* Tags + Author */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono px-3 py-1.5 border border-white/10 text-primary bg-primary/5 rounded hover:bg-primary/10 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                                        {post.author.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white">{post.author.name}</span>
                                        <span className="text-muted-foreground text-xs font-mono uppercase">{post.author.role}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                         {/* Cover Image */}
                        {post.coverImage && (
                            <div className="aspect-[21/9] relative overflow-hidden rounded-sm mb-24 border-y border-white/10 group">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/50 tracking-widest">
                                    IMG_REF: {slug.toUpperCase()}
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="relative flex gap-8 md:gap-12">
                            {/* Marginalia Track */}
                            <div className="hidden md:flex flex-col items-center w-px bg-gradient-to-b from-primary/50 via-white/5 to-transparent sticky top-32 h-[calc(100vh-8rem)]">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mb-12" />
                                <div className="writing-vertical-rl text-[10px] text-white/20 font-mono tracking-[0.2em] uppercase py-12">
                                    INVARITECH INTELLIGENCE ARCHIVE
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-auto" />
                            </div>

                            {/* Prose Feed */}
                            <div className="prose prose-lg prose-invert max-w-none flex-1
                                prose-headings:text-white prose-headings:tracking-tight 
                                prose-p:text-muted-foreground prose-p:leading-relaxed 
                                prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary prose-a:transition-all
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                                prose-strong:text-white prose-strong:font-bold prose-strong:text-shadow-sm
                                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-sm">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => (
                                            <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-8 text-white border-l-4 border-primary pl-6 flex items-center gap-4">
                                                {children}
                                            </h2>
                                        ),
                                        h2: ({ children }) => (
                                            <h3 className="text-2xl md:text-3xl font-bold mt-16 mb-6 text-white group flex items-center">
                                                <span className="text-primary/40 mr-4 font-mono text-lg group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -ml-10 w-6 text-right">#</span>
                                                {children}
                                            </h3>
                                        ),
                                        h3: ({ children }) => (
                                            <h4 className="text-xl md:text-2xl font-bold mt-12 mb-4 text-white flex items-center gap-3">
                                                <span className="w-2 h-2 bg-primary/50 rounded-sm rotate-45" />
                                                {children}
                                            </h4>
                                        ),
                                        a: ({ href, children }) => {
                                            if (href?.startsWith("/")) {
                                                return (
                                                    <Link href={href} className="text-primary font-bold no-underline border-b-2 border-primary/30 hover:border-primary transition-all hover:bg-primary/5 px-1 -mx-1 rounded-sm">
                                                        {children}
                                                    </Link>
                                                );
                                            }
                                            return (
                                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-bold no-underline border-b-2 border-primary/30 hover:border-primary transition-all hover:bg-primary/5 px-1 -mx-1 rounded-sm">
                                                    {children}
                                                </a>
                                            );
                                        },
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-primary bg-white/5 p-8 my-10 rounded-r-xl not-italic relative overflow-hidden group">
                                                <div className="font-mono text-xs text-primary mb-4 uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                                    {"// SYSTEM NOTE"}
                                                </div>
                                                <div className="text-lg md:text-xl text-white/90 leading-relaxed font-light">{children}</div>
                                            </blockquote>
                                        ),
                                        hr: () => (
                                            <div className="my-16 relative flex items-center justify-center group">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-primary/20 group-hover:border-primary/40 transition-colors"></div>
                                                </div>
                                                <div className="relative z-10 bg-[#030305] px-4 font-mono text-[10px] text-primary/50 tracking-[0.3em] uppercase group-hover:text-primary transition-colors">
                                                    {"// SYSTEM_BREAK //"}
                                                </div>
                                            </div>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="space-y-4 my-8 pl-0 list-none">
                                                {children}
                                            </ul>
                                        ),
                                        li: ({ children }) => (
                                            <li className="flex items-start gap-4 text-muted-foreground group">
                                                <span className="mt-2 w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary transition-colors rotate-45 shrink-0" />
                                                <span className="leading-relaxed group-hover:text-white/80 transition-colors">{children}</span>
                                            </li>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="font-bold text-white bg-white/5 px-1 rounded mx-0.5 border border-white/10 group-hover:border-primary/30 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                                {children}
                                            </strong>
                                        )
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <section className="mt-32 pt-16 border-t border-white/10 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 max-w-3xl mx-auto text-white">
                                READY TO <span className="text-primary">AUTOMATE</span>?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                                Schedule a 30-minute call to scope your biggest bottleneck. No pitch — just engineering strategy.
                            </p>
                            <div className="flex justify-center">
                                <MagneticButton className="px-12 py-6 text-xl">
                                    <a
                                        href="https://calendly.com/hello-invaritech/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3"
                                    >
                                        Start Transmission <ArrowRight className="w-6 h-6" />
                                    </a>
                                </MagneticButton>
                            </div>
                             <div className="mt-12 text-sm text-muted-foreground">
                                <p>
                                    Or explore our <Link href="/services/" className="underline hover:text-white text-primary/80">Services Hub</Link> for more options.
                                </p>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        </>
    );
}
