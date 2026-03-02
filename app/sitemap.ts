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
            url: `${baseUrl}/about/`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work/`,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/work/eudr-compliance-bridge/`,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/services/`,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/ai-workflow-automation-services/`,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/ai-integration-services/`,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/enterprise-ai-chatbot-deployment/`,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/generative-ai-backend-development/`,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/ai-automation-consulting/`,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/ai-automation-sprint/`,
            changeFrequency: "weekly",
            priority: 0.95,
        },
/*         {
            url: `${baseUrl}/results/`,
            changeFrequency: "monthly",
            priority: 0.7,
        }, */
        {
            url: `${baseUrl}/tools/`,
            changeFrequency: "weekly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/tools/assessment/`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/invoice-extractor/`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools/cost-to-close-calculator/`,
            changeFrequency: "monthly",
            priority: 0.75,
        },
        {
            url: `${baseUrl}/blog/`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...blogPostEntries,
        {
            url: `${baseUrl}/careers/`,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact/`,
            changeFrequency: "monthly",
            priority: 0.7,
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
