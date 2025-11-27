import { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

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

    return {
        title: `${post.title} - INVARITECH Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://www.invaritech.ai/blogs/${post.slug}`,
            images: post.coverImage
                ? [
                      {
                          url: post.coverImage,
                          width: 1200,
                          height: 630,
                          alt: post.title,
                      },
                  ]
                : [
                      {
                          url: "/og-image.webp",
                          width: 1200,
                          height: 630,
                          alt: post.title,
                          type: "image/webp",
                      },
                  ],
        },
        alternates: {
            canonical: `https://www.invaritech.ai/blogs/${post.slug}`,
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

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <article className="mx-auto max-w-4xl px-6">
                {/* Back Button */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Back to all posts
                </Link>

                {/* Header */}
                <header className="mb-12">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                {post.author.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-medium text-foreground">
                                    {post.author.name}
                                </div>
                                <div className="text-xs">{post.author.role}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            <span>
                                {estimateReadingTime(post.content)} min read
                            </span>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="aspect-video relative overflow-hidden rounded-2xl mb-12 bg-muted">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-bold mt-12 mb-6 leading-tight">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-3xl font-bold mt-10 mb-4 leading-tight">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-2xl font-bold mt-8 mb-3 leading-tight">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-lg leading-relaxed mb-6 text-foreground/90">
                                    {children}
                                </p>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-primary hover:underline font-medium"
                                    target={
                                        href?.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        href?.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 mb-6 text-lg">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-foreground/90 leading-relaxed">
                                    {children}
                                </li>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-bold text-foreground">
                                    {children}
                                </strong>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ children }) => (
                                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t">
                    <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-4">
                            Ready to automate your workflow?
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                            Schedule a 30-minute call to discuss your automation
                            needs. We'll help you identify your biggest bottleneck
                            and show you what's possible.
                        </p>
                        <a
                            href="https://calendly.com/hello-invaritech/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Schedule a Call
                        </a>
                    </div>
                </div>

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        Back to all posts
                    </Link>
                </div>
            </article>
        </main>
    );
}
