import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blogs - Insights & Updates",
    description:
        "Read our latest thoughts, insights, and updates on automation, compliance, back-office systems, and digital transformation for small service businesses.",
    openGraph: {
        title: "Blogs - Insights & Updates from INVARITECH",
        description:
            "Read our latest thoughts, insights, and updates on automation, compliance, and digital transformation.",
        url: "https://www.invaritech.ai/blogs/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Blogs - Insights & Updates from INVARITECH",
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
        <main className="min-h-screen bg-background relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-16 max-w-3xl">
                    <TextEffect
                        per="word"
                        as="h1"
                        preset="fade"
                        className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
                    >
                        Insights & Updates
                    </TextEffect>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.3}
                        className="text-lg text-muted-foreground md:text-xl leading-relaxed"
                    >
                        Practical guides on automation, compliance, and building
                        better systems for small businesses.
                    </TextEffect>
                </div>

                {/* Blog Posts Grid */}
                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blogs/${post.slug}`}
                                className="group"
                            >
                                <Card className="h-full overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card">
                                    {/* Cover Image */}
                                    {post.coverImage ? (
                                        <div className="aspect-video relative overflow-hidden bg-muted">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-6xl font-bold text-primary/10">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="size-3" />
                                                <span>
                                                    {formatDate(post.publishedAt)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                <span>
                                                    {estimateReadingTime(
                                                        post.excerpt
                                                    )}{" "}
                                                    min read
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More */}
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2">
                                            Read article
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
