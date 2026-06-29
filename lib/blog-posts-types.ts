export interface BlogPost {
    slug: string;
    title: string;
    seoTitle?: string;
    articleSection: "Finance Operations" | "Regulatory Compliance";
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

export type BlogPostMetadata = BlogPost;
