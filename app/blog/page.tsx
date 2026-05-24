import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

export const metadata: Metadata = {
    title: "Accounts Payable Controls & Finance Automation Blog",
    description:
        "Practical guides for AP controls, invoice approval workflows, duplicate payment prevention, and finance automation for Australian mid-market teams.",
    openGraph: {
        title: "Accounts Payable Controls & Finance Automation Blog",
        description:
            "Practical guides for AP controls, invoice approval workflows, duplicate payment prevention, and finance automation for Australian mid-market teams.",
        url: "https://www.invaritech.ai/blog/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH Blog - Accounts Payable Automation Guides",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Finance Operations & Compliance Automation Guides",
        description:
            "Practical guides for AP controls, invoice approval workflows, duplicate payment prevention, and finance automation for Australian mid-market teams.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/blog/",
    },
};

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

const categories = ["Accounts Payable", "Invoice Controls", "Month-End Close", "Finance Automation", "Cash Visibility"];

export default function BlogsPage() {
    const posts = getAllPosts();

    return (
        <main className="site-page relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Accounts Payable Automation Blog</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Practical guides for accounts payable automation.
                            </h1>
                        </div>
                        <div data-reveal="block">
                            <p className="site-lead">
                                Learn how to design invoice approval workflow controls, reduce duplicate payments, improve supplier statement reconciliation, and prevent payment diversion fraud.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <span
                                        key={category}
                                        className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle border border-border px-3 py-1 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 flex flex-col gap-5 border-y border-border py-7 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-editorial text-3xl font-semibold">Want us to check one live AP risk?</h2>
                            <p className="mt-2 text-muted-foreground">Send one invoice approval workflow, supplier reconciliation issue, or duplicate payment example.</p>
                        </div>
                        <Link
                            href="/contact/?scan=1"
                            className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            Free AP Controls Scan <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-24 border border-dashed border-border">
                            <p className="text-muted-foreground text-xl font-mono">
                                {"// ARCHIVE EMPTY //"} <br />
                                <span className="text-sm opacity-50">Transmissions pending...</span>
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}/`}
                                    className="group block"
                                >
                                    <article className="h-full flex flex-col">
                                        {/* Image */}
                                        <div className="aspect-[4/3] relative overflow-hidden mb-6 bg-card border border-border">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-card">
                                                    <span className="font-editorial text-4xl text-foreground-subtle/60 font-semibold">
                                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 border border-border text-[10px] font-mono text-foreground-subtle">
                                                {estimateReadingTime(post.content)} MIN READ
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-mono uppercase tracking-wider text-foreground-muted"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="font-editorial text-2xl md:text-3xl font-semibold leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-foreground-muted text-base leading-relaxed line-clamp-3 mb-6 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                                                <span className="text-sm font-mono text-foreground-subtle">
                                                    {formatDate(post.publishedAt)}
                                                </span>
                                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    READ <MoveUpRight className="size-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
