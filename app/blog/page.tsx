import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blogs - Case Studies, Build Notes, and BOFU Answers",
    description:
        "Daily content from INVARITECH on enterprise AI automation: case studies, developer journey, CEO corner, and bottom-of-funnel implementation answers.",
    openGraph: {
        title: "INVARITECH Blog - Enterprise AI Automation Insights",
        description:
            "Case studies, engineering notes, founder POV, and BOFU guidance for teams implementing AI automation on existing infrastructure.",
        url: "https://www.invaritech.ai/blog/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH Blog - Enterprise AI Automation Insights",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH Blog — AI Automation Insights",
        description:
            "Case studies, engineering notes, and BOFU guidance for teams implementing AI automation on existing infrastructure.",
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

const categories = ["Case Studies", "Developer Journey", "CEO Corner", "BOFU Q&A"];

export default function BlogsPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <section className="pt-32 pb-16 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <TextEffect
                        per="char"
                        preset="fade"
                        className="text-[11px] font-mono tracking-[0.22em] text-primary mb-8 block uppercase"
                    >
                        Intelligence Archive
                    </TextEffect>

                    <h1 className="font-editorial text-6xl md:text-[9rem] leading-[0.88] font-semibold tracking-tight mb-12 text-foreground">
                        <TextEffect per="word" preset="fade" className="inline">
                            INSIGHTS &amp;
                        </TextEffect>
                        <br />
                        <span className="text-foreground-muted">ANALYSIS</span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t border-border pt-8">
                        <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl font-light">
                            Case Studies, Engineering Notes, and Strategic Implementation Guides.
                        </p>
                        <div className="flex flex-wrap gap-2">
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
            </section>

            {/* Blog Posts Grid */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-7xl mx-auto">
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
        </main>
    );
}
