export interface BlogPost {
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
