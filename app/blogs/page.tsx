import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/badge";
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "Blogs - Case Studies, Build Notes, and BOFU Answers",
    description:
        "Daily content from INVARITECH on enterprise AI automation: case studies, developer journey, CEO corner, and bottom-of-funnel implementation answers.",
    openGraph: {
        title: "INVARITECH Blog - Enterprise AI Automation Insights",
        description:
            "Case studies, engineering notes, founder POV, and BOFU guidance for teams implementing AI automation on existing infrastructure.",
        url: "https://www.invaritech.ai/blogs/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "INVARITECH Blog - Enterprise AI Automation Insights",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/blogs/",
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

export default function BlogsPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            <ArtisticBackground />

            {/* Header */}
             <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-[90vw] mx-auto">
                    <TextEffect 
                        per="char" 
                        preset="fade" 
                        className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block"
                    >
                        INTELLIGENCE ARCHIVE
                    </TextEffect>
                    
                    <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-12 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            INSIGHTS &
                        </TextEffect>
                        <br />
                        <span className="text-white/20">ANALYSIS</span>
                    </h1>
                     <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t border-white/10 pt-8">
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
                            Case Studies, Engineering Notes, and Strategic Implementation Guides.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Case Studies",
                                "Developer Journey",
                                "CEO Corner",
                                "BOFU Q&A",
                            ].map((category) => (
                                <Badge key={category} variant="outline" className="border-white/10 text-white/60 hover:text-primary hover:border-primary/50 transition-colors">
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-[95vw] mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
                            <p className="text-muted-foreground text-xl font-mono">
                                // ARCHIVE EMPTY // <br/>
                                <span className="text-sm opacity-50">Transmissions pending...</span>
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/blogs/${post.slug}/`}
                                    className="group block"
                                >
                                    <article className="h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="aspect-[4/3] relative overflow-hidden rounded-md mb-6 bg-white/5">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                                                    <span className="font-mono text-4xl text-white/10 font-bold">
                                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/80">
                                                {estimateReadingTime(post.content)} MIN READ
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs font-mono uppercase tracking-wider text-primary"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-6 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                                                 <span className="text-sm font-mono text-muted-foreground">
                                                    {formatDate(post.publishedAt)}
                                                </span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                    READ ENTRY <MoveUpRight className="size-4" />
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
