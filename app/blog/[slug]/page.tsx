import { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Script from "next/script";
import { Button } from "@/components/ui/button";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return { title: "Post Not Found" };

    const imageUrl = post.coverImage || "/og-image.png";

    return {
        title: { absolute: post.seoTitle ?? post.title },
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author.name }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://www.invaritech.ai/blog/${post.slug}/`,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author.name],
            tags: post.tags,
            images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
        alternates: {
            canonical: `https://www.invaritech.ai/blog/${post.slug}/`,
        },
    };
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadingTime(content: string): number {
    return Math.ceil(content.split(/\s+/).length / 200);
}

function generateArticleSchema(post: {
    title: string;
    excerpt: string;
    content: string;
    seoTitle?: string;
    articleSection: string;
    tags: string[];
    author: { name: string; role: string };
    publishedAt: string;
    dateModified?: string;
    coverImage?: string;
    slug: string;
}) {
    const baseUrl = "https://www.invaritech.ai";
    const url = `${baseUrl}/blog/${post.slug}/`;
    const imageUrl = post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/og-image.png`;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: { "@type": "ImageObject", url: imageUrl },
        datePublished: post.publishedAt,
        dateModified: post.dateModified ?? post.publishedAt,
        author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
        publisher: {
            "@type": "Organization",
            name: "INVARITECH",
            logo: { "@type": "ImageObject", url: `${baseUrl}/logo-image.png`, width: 516, height: 516 },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        articleSection: post.articleSection,
        keywords: post.tags.join(", "),
    };
}

// Shared markdown component definitions for light theme
function markdownComponents(slug: string) {
    return {
        table: ({ children }: { children?: React.ReactNode }) => (
            <div className="overflow-x-auto my-10">
                <table className="w-full border-collapse font-mono text-sm">{children}</table>
            </div>
        ),
        thead: ({ children }: { children?: React.ReactNode }) => (
            <thead className="border-b border-primary/30">{children}</thead>
        ),
        tbody: ({ children }: { children?: React.ReactNode }) => <tbody>{children}</tbody>,
        tr: ({ children }: { children?: React.ReactNode }) => (
            <tr className="border-b border-border hover:bg-secondary/40 transition-colors">{children}</tr>
        ),
        th: ({ children }: { children?: React.ReactNode }) => (
            <th className="text-left px-4 py-3 text-primary font-mono text-xs uppercase tracking-widest whitespace-nowrap">{children}</th>
        ),
        td: ({ children }: { children?: React.ReactNode }) => (
            <td className="px-4 py-3 text-foreground-muted text-sm leading-relaxed">{children}</td>
        ),
        h1: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="font-editorial text-3xl md:text-5xl font-semibold mt-20 mb-10 text-foreground border-l-4 border-primary pl-6">
                {children}
            </h2>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="font-editorial text-2xl md:text-4xl font-semibold mt-16 mb-8 text-foreground">
                {children}
            </h3>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h4 className="font-editorial text-xl md:text-2xl font-semibold mt-12 mb-6 text-foreground flex items-center gap-3">
                <span className="w-2 h-2 bg-primary/50 rotate-45 shrink-0" />
                {children}
            </h4>
        ),
        a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
            if (href?.startsWith("/")) {
                return (
                    <Link href={href} className="inline-block text-primary font-medium no-underline border-b border-primary/40 hover:border-primary transition-all hover:bg-primary/5 px-1 py-1 -my-1 leading-[inherit]">
                        {children}
                    </Link>
                );
            }
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-medium no-underline border-b border-primary/40 hover:border-primary transition-all hover:bg-primary/5 px-1 py-1 -my-1 leading-[inherit]">
                    {children}
                </a>
            );
        },
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-4 border-primary bg-primary/[0.04] p-8 my-10 not-italic relative overflow-hidden group">
                <div className="font-mono text-xs text-primary mb-4 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary" />
                    {"// NOTE"}
                </div>
                <div className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">{children}</div>
            </blockquote>
        ),
        hr: () => (
            <div className="my-16 relative flex items-center justify-center group">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border group-hover:border-primary/30 transition-colors" />
                </div>
                <div className="relative z-10 bg-card px-4 font-mono text-[10px] text-foreground-subtle tracking-[0.3em] uppercase">
                    {"// —— //"}
                </div>
            </div>
        ),
        ul: ({ children }: { children?: React.ReactNode }) => (
            <ul className="space-y-4 my-8 pl-0 list-none">{children}</ul>
        ),
        li: ({ children }: { children?: React.ReactNode }) => (
            <li className="flex items-start gap-4 text-foreground-muted group">
                <span className="mt-2 w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary transition-colors rotate-45 shrink-0" />
                <span className="leading-[1.85] group-hover:text-foreground transition-colors">{children}</span>
            </li>
        ),
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="font-semibold text-foreground bg-primary/[0.06] px-1 border border-primary/10">
                {children}
            </strong>
        ),
        // Suppress unused slug warning
        ...(slug ? {} : {}),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    const articleSchema = generateArticleSchema(post);
    const components = markdownComponents(slug);

    const hrIndex = post.coverImage ? post.content.indexOf("\n---\n") : -1;
    const hasIntroSplit = hrIndex !== -1;
    const introContent = hasIntroSplit ? post.content.slice(0, hrIndex) : null;
    const bodyContent = hasIntroSplit ? post.content.slice(hrIndex + 5) : post.content;

    return (
        <>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <main className="min-h-screen bg-background relative overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.012]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                </div>

                <article className="relative z-10 pt-32 pb-24 px-6 md:px-0">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Area */}
                        <header className="mb-16 pb-12 border-b border-border">
                            {/* Meta Top Bar */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 font-mono text-xs text-foreground-subtle uppercase tracking-widest border-l-2 border-primary/40 pl-4">
                                <Link href="/blog/" className="inline-flex min-h-10 items-center gap-2 hover:text-foreground transition-colors group">
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
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-primary/40" />
                                <span className="font-mono text-foreground-subtle text-[11px] tracking-[0.22em] uppercase">
                                    Intelligence // Strategy
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="font-editorial text-4xl md:text-7xl font-semibold tracking-tight mb-8 leading-[0.9] text-foreground">
                                {post.title}
                            </h1>

                            {/* Tags + Author */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-border">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-mono px-3 py-1.5 border border-primary/20 text-foreground-muted bg-primary/[0.05]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="size-10 bg-card border border-border flex items-center justify-center font-semibold text-foreground">
                                        {post.author.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground">{post.author.name}</span>
                                        <span className="text-foreground-subtle text-xs font-mono uppercase tracking-wider">{post.author.role}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Reading card */}
                        <div className="bg-card border border-border/60 p-8 md:p-14 mb-16">
                            <div className="relative flex gap-8 md:gap-12">
                                {/* Marginalia track */}
                                <div className="hidden md:flex flex-col items-center w-px bg-gradient-to-b from-primary/40 via-border to-transparent sticky top-32 h-[calc(100vh-8rem)]">
                                    <div className="w-1.5 h-1.5 bg-primary mb-12" />
                                    <div className="writing-vertical-rl text-[10px] text-foreground-subtle/70 font-mono tracking-[0.2em] uppercase py-12">
                                        INVARITECH INTELLIGENCE ARCHIVE
                                    </div>
                                    <div className="w-1.5 h-1.5 bg-border mt-auto" />
                                </div>

                                {/* Prose feed */}
                                <div className="prose prose-lg max-w-none flex-1
                                    prose-headings:text-foreground prose-headings:tracking-tight
                                    prose-p:text-foreground-muted prose-p:leading-[1.85]
                                    prose-a:text-primary prose-a:no-underline
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:not-italic
                                    prose-strong:text-foreground
                                    prose-code:text-primary prose-code:bg-primary/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:rounded-none
                                    prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-none">

                                    {hasIntroSplit && (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                            {introContent}
                                        </ReactMarkdown>
                                    )}

                                    {post.coverImage && (
                                        <div className="relative my-12 border border-border group not-prose overflow-hidden">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                width={1200}
                                                height={630}
                                                className="w-full h-auto grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
                                                priority
                                            />
                                            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-foreground-subtle tracking-widest bg-background/80 px-2 py-0.5">
                                                IMG_REF: {slug.toUpperCase()}
                                            </div>
                                        </div>
                                    )}

                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                        {bodyContent}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <section className="mt-16 pt-16 border-t border-border text-center">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="h-[1px] w-8 bg-primary/40" />
                                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Book Workflow Diagnostic</span>
                                <div className="h-[1px] w-8 bg-primary/40" />
                            </div>
                            <h2 className="font-editorial text-3xl md:text-5xl font-semibold tracking-tight mb-6 max-w-3xl mx-auto text-foreground">
                                Want us to map one live finance workflow?
                            </h2>
                            <p className="text-lg text-foreground-muted mb-12 max-w-2xl mx-auto">
                                Bring one finance or regulated operations workflow. We will map the current process, find where controls are missing, and recommend the smallest useful build scope.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-semibold h-13 px-8">
                                    <Link
                                        href="/contact/?diagnostic=1&src=blog"
                                        className="flex items-center gap-3"
                                    >
                                        Book Workflow Diagnostic <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="rounded-none border-border bg-transparent hover:bg-foreground hover:text-background h-13 px-8">
                                    <Link href="/work/">Explore Work</Link>
                                </Button>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        </>
    );
}
