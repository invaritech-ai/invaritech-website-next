const PAGE_URL = "https://www.invaritech.ai/glossary/three-way-match/";
const SITE_URL = "https://www.invaritech.ai/";

export function buildBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Invaritech", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}glossary/` },
            { "@type": "ListItem", position: 3, name: "Three-Way Match", item: PAGE_URL },
        ],
    };
}

export function buildArticleSchema({ lastUpdated }: { lastUpdated: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Three-Way Match: Invoice, PO, and Goods Receipt Matching",
        description:
            "How three-way matching works between invoice, purchase order, and goods receipt — what an agentic exception-routing system catches that manual review misses.",
        mainEntityOfPage: PAGE_URL,
        articleSection: "Glossary",
        datePublished: lastUpdated,
        dateModified: lastUpdated,
        author: {
            "@type": "Person",
            name: "Aditi Garg",
            jobTitle: "Founder & Director",
            worksFor: { "@type": "Organization", name: "Invaritech" },
            sameAs: [
                "https://www.linkedin.com/in/aditigarg95",
                "https://scholar.google.com/citations?user=0WE3rSUAAAAJ",
            ],
        },
        publisher: {
            "@type": "Organization",
            name: "Invaritech",
            url: SITE_URL,
        },
    };
}

const FAQ_ENTRIES: { q: string; a: string }[] = [
    {
        q: "What's the difference between two-way and three-way matching?",
        a: "Two-way match checks invoice against PO. Three-way adds the goods receipt note. The goods-receipt leg is the only control that catches fraudulent invoices for goods never delivered. Two-way is fine for services and subscriptions. Three-way is the standard for physical inventory and capex purchases.",
    },
    {
        q: "What's an acceptable amount tolerance?",
        a: "Most companies set 2 to 5 percent with a small dollar floor (typically $25 to $100) to handle freight and fuel surcharges without flagging every line. Tighter than 1 percent generates noise; looser than 10 percent stops catching real variances.",
    },
    {
        q: "Do small businesses need three-way matching?",
        a: "Below roughly 100 invoices per month, the manual cost of three-way matching may exceed the loss from skipping it. Above that volume the math flips. The most cost-effective entry point for small teams is automated duplicate-invoice detection plus PO-only match on amount.",
    },
    {
        q: "Can three-way matching catch duplicate payments?",
        a: "Yes, and it is one of the highest-value catches. The PO number is the join key. Two invoices referencing the same PO are by definition candidate duplicates, regardless of whether the invoice numbers, dates, or amounts match.",
    },
    {
        q: "How long does AP automation take to implement?",
        a: "A fixed-scope three-way match system typically takes 4 to 8 weeks from kick-off to production. Most of the time goes to data plumbing (export format edge cases, document intake reliability, vendor master normalization), not to the matching logic itself.",
    },
    {
        q: "What about non-PO invoices?",
        a: "Non-PO invoices (subscriptions, utilities, professional services without a formal PO) bypass three-way match by design. They run through a different control set: approval evidence by amount band, recurring-vendor spend monitoring, and budget-line matching.",
    },
];

export function buildFaqSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ENTRIES.map((e) => ({
            "@type": "Question",
            name: e.q,
            acceptedAnswer: { "@type": "Answer", text: e.a },
        })),
    };
}
