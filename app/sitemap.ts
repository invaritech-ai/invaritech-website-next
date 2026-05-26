import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.invaritech.ai";

    // Get all blog posts
    const blogPosts = getAllPosts();

    // Generate sitemap entries for blog posts
    const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}/`,
        lastModified: new Date(post.dateModified ?? post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        {
            url: `${baseUrl}/`,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/finance-exception-automation/`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about/`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/resources/`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/resources/supplier-payment-control-rule-table/`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/resources/invoice-extractor/`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/resources/invoice-processing-automation/`,
            changeFrequency: "monthly" as const,
            priority: 0.75,
        },
        {
            url: `${baseUrl}/resources/cost-to-close-calculator/`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work/`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work/eudr-compliance-bridge/`,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/glossary/three-way-match/`,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...blogPostEntries,
        {
            url: `${baseUrl}/contact/`,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy/`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms/`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
