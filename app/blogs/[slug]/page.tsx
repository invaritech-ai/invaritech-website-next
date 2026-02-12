import { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, Printer } from "lucide-react";
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
            <main className="min-h-screen bg-black relative overflow-hidden">
                <ArtisticBackground />

                <article className="relative z-10 pt-32 pb-24 px-6 md:px-0">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Area */}
                        <header className="mb-16 border-b border-white/10 pb-12">
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

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-mono px-2 py-1 border border-white/10 text-primary bg-primary/5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[0.9] text-white mix-blend-difference">
                                <TextEffect per="word" preset="slide">
                                    {post.title}
                                </TextEffect>
                            </h1>

                            {/* Author */}
                            <div className="flex items-center gap-4 text-sm">
                                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white">{post.author.name}</span>
                                    <span className="text-muted-foreground text-xs font-mono uppercase">{post.author.role}</span>
                                </div>
                            </div>
                        </header>

                         {/* Cover Image */}
                        {post.coverImage && (
                            <div className="aspect-[21/9] relative overflow-hidden rounded-sm mb-16 border-y border-white/10 group">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/50 tracking-widest">
                                    IMG_REF: {slug.toUpperCase()}
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white border-l-4 border-primary pl-6">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl md:text-2xl font-bold mt-10 mb-4 text-white">
                                            {children}
                                        </h3>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border border-white/10 bg-white/5 p-8 my-8 rounded-2xl not-italic relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                            <div className="font-mono text-xs text-primary mb-4 uppercase tracking-widest">// SYSTEM NOTE</div>
                                            <div className="text-lg text-white/90">{children}</div>
                                        </blockquote>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-muted-foreground marker:text-primary">
                                            {children}
                                        </ul>
                                    ),
                                    li: ({ children }) => (
                                        <li className="pl-2">
                                            {children}
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-white">
                                            {children}
                                        </strong>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-24 pt-12 border-t border-white/10">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-[100px] rounded-full" />
                                
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                            Ready to automate your workflow?
                                        </h2>
                                        <p className="text-muted-foreground text-lg mb-0 max-w-xl">
                                            Schedule a 30-minute call to scope your biggest bottleneck.
                                        </p>
                                    </div>
                                    
                                    <a
                                        href="https://calendly.com/hello-invaritech/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MagneticButton className="bg-primary text-black font-bold px-8 py-4">
                                            Start Transmission
                                        </MagneticButton>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}
