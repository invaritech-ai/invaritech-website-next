import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.invaritech.ai";
    const currentDate = new Date();

    // Get all blog posts
    const blogPosts = getAllPosts();

    // Generate sitemap entries for blog posts
    const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}/`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/work/eudr-compliance-bridge/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/weekend-suite/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/ai-automation-sprint/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/services/ai-workflow-automation-services/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/ai-integration-services/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/enterprise-ai-chatbot-deployment/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/generative-ai-backend-development/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/ai-automation-consulting/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services/compliance-bridge/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/solutions/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/use-cases/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/ai-automation-sprint/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/ops-efficiency-sprint/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/results/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/security/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/assessment/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        ...blogPostEntries,
        {
            url: `${baseUrl}/careers/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/careers/full-stack-developer/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/terms/`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
