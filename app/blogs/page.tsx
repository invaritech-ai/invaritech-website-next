import { Metadata } from "next";

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

export default function BlogsPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Blogs
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Read our latest thoughts and updates.
                    </p>
                </section>
            </div>
        </main>
    );
}
