import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";
import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

export const metadata: Metadata = {
    title: "Finance & Compliance Automation Guides",
    description:
        "Practical guides for finance and compliance automation: accounts payable, invoice approval, compliance evidence, regulated submissions, and workflow design.",
    openGraph: {
        title: "Finance & Compliance Automation Guides",
        description:
            "Practical guides for finance and compliance automation: accounts payable, invoice approval, compliance evidence, regulated submissions, and workflow design.",
        url: "https://www.invaritech.ai/blog/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH Blog - Finance & Compliance Automation Guides",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Finance & Compliance Automation Guides",
        description:
            "Practical guides for finance and compliance automation: accounts payable, invoice approval, compliance evidence, regulated submissions, and workflow design.",
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

const pillars = ["Finance Automation", "Compliance Automation"];

function BlogCard({
    post,
    index,
}: {
    post: ReturnType<typeof getAllPosts>[number];
    index: number;
}) {
    return (
        <Link
            href={`/blog/${post.slug}/`}
            className="group block"
        >
            <article className="h-full flex flex-col">
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

                <div className="flex-1 flex flex-col">
                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                            #{post.articleSection === "Finance Operations" ? "FinanceAutomation" : "ComplianceAutomation"}
                        </span>
                        {post.tags.slice(0, 1).map((tag) => (
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
    );
}

export default function BlogsPage() {
    const posts = getAllPosts();
    const financePosts = posts.filter((post) => post.articleSection === "Finance Operations");
    const regopsPosts = posts.filter((post) => post.articleSection === "Regulatory Compliance");
    const sections = [
        {
            id: "finance-ops",
            eyebrow: "Finance Automation",
            title: "Finance automation writing",
            body: "Accounts payable, invoice controls, month-end close, cash visibility, and automation decisions for finance teams.",
            posts: financePosts,
        },
        {
            id: "regops",
            eyebrow: "Compliance Automation",
            title: "Compliance automation writing",
            body: "Compliance automation, EUDR workflows, evidence handling, regulated submissions, and operational scale.",
            posts: regopsPosts,
        },
    ];

    return (
        <main className="site-page relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Finance & Compliance Automation Blog</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Practical writing for finance and compliance automation.
                            </h1>
                        </div>
                        <div data-reveal="block">
                            <p className="site-lead">
                                Finance automation is where we publish most tools and guides today. Compliance automation stays visible through the older proof base and writing.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {pillars.map((category) => (
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
                            href="/contact/?diagnostic=1"
                            className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            Share a Workflow <ArrowRight className="ml-2 size-4" />
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
                        <div className="space-y-20">
                            {sections.map((section) => (
                                <section key={section.id} id={section.id} className="scroll-mt-24">
                                    <div className="mb-10 border-t border-border pt-10">
                                        <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                            {section.eyebrow}
                                        </p>
                                        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                                            <h2 className="font-editorial text-4xl font-semibold tracking-tight md:text-5xl">
                                                {section.title}
                                            </h2>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {section.body}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                                        {section.posts.map((post, index) => (
                                            <BlogCard
                                                key={post.slug}
                                                post={post}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
