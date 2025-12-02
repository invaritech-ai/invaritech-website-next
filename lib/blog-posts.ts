// Import all blog posts
import { post as whySmallBusinessesNeedAutomation } from "./blog-posts/why-small-businesses-need-automation";
import { post as complianceAutomationForSmallTeams } from "./blog-posts/compliance-automation-for-small-teams";
import { post as buildingVsBuyingAutomationSoftware } from "./blog-posts/building-vs-buying-automation-software";
import { post as whyManualEudrComplianceFailsAtScale } from "./blog-posts/why-manual-eudr-compliance-fails-at-scale";

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        role: string;
    };
    publishedAt: string; // ISO date string
    tags: string[];
    coverImage?: string;
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        role: string;
    };
    publishedAt: string;
    tags: string[];
    coverImage?: string;
}

// Aggregate all blog posts
export const blogPosts: BlogPost[] = [
    whySmallBusinessesNeedAutomation,
    complianceAutomationForSmallTeams,
    buildingVsBuyingAutomationSoftware,
    whyManualEudrComplianceFailsAtScale,
];

// Helper functions
export function getAllPosts(): BlogPostMetadata[] {
    return blogPosts
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            author: post.author,
            publishedAt: post.publishedAt,
            tags: post.tags,
            coverImage: post.coverImage,
        }))
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
    return blogPosts.map((post) => post.slug);
}
