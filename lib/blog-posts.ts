import type { BlogPost, BlogPostMetadata } from "./blog-posts-types";
import { whyConsultanciesGetStuck } from "./blog-posts/why-consultancies-get-stuck";
import { complianceAutomation } from "./blog-posts/compliance-automation-done-right";
import { buildingVsBuying } from "./blog-posts/building-vs-buying-custom-automation";
import { whyManualEudrFails } from "./blog-posts/why-manual-eudr-compliance-fails";
import { regopsTechnical } from "./blog-posts/regops-technical";
import { regopsStrategy } from "./blog-posts/regops-strategy";
import { consultancyTrap } from "./blog-posts/consultancy-trap";
import { monthEndClose } from "./blog-posts/month-end-close-automation";
import { aiInvoiceDataExtraction } from "./blog-posts/ai-invoice-data-extraction";
import { cashFlowVisibility } from "./blog-posts/cash-flow-visibility-automation";
import { whySmallBusinesses } from "./blog-posts/why-small-businesses-need-automation";

export type { BlogPost, BlogPostMetadata };

const blogPosts: BlogPost[] = [
    whyConsultanciesGetStuck,
    complianceAutomation,
    buildingVsBuying,
    whyManualEudrFails,
    regopsTechnical,
    regopsStrategy,
    consultancyTrap,
    monthEndClose,
    aiInvoiceDataExtraction,
    cashFlowVisibility,
    whySmallBusinesses,
];

export function getAllPosts(): BlogPostMetadata[] {
    return blogPosts
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            seoTitle: post.seoTitle,
            articleSection: post.articleSection,
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

export function formatBlogDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function estimateReadingTime(content: string): number {
    return Math.ceil(content.split(/\s+/).length / 200);
}
