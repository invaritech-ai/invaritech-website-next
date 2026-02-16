// Import all blog posts
import { post as whyConsultanciesGetStuck } from "./blog-posts/why-consultancies-get-stuck";
import { post as complianceAutomationDoneRight } from "./blog-posts/compliance-automation-done-right";
import { post as buildingVsBuyingCustomAutomation } from "./blog-posts/building-vs-buying-custom-automation";
import { post as whyManualEudrComplianceFails } from "./blog-posts/why-manual-eudr-compliance-fails";
import { post as regopsTechnical } from "./blog-posts/regops-technical";
import { post as regopsStrategy } from "./blog-posts/regops-strategy";
import { post as consultancyTrap } from "./blog-posts/consultancy-trap";

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
    dateModified?: string; // ISO date string, when content was last updated
    tags: string[];
    coverImage?: string;
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        role: string;
    };
    publishedAt: string;
    dateModified?: string;
    tags: string[];
    coverImage?: string;
}

// Aggregate all blog posts
export const blogPosts: BlogPost[] = [
    whyConsultanciesGetStuck,
    complianceAutomationDoneRight,
    buildingVsBuyingCustomAutomation,
    whyManualEudrComplianceFails,
    regopsTechnical,
    regopsStrategy,
    consultancyTrap,
];

// Helper functions
export function getAllPosts(): BlogPostMetadata[] {
    return blogPosts
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            publishedAt: post.publishedAt,
            dateModified: post.dateModified,
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
