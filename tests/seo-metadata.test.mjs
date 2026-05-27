import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const read = (path) => readFileSync(path, "utf8");

const blogExpectations = {
    "why-small-businesses-need-automation.ts": {
        seoTitle: "Small Business Automation for Finance Ops",
        articleSection: "Finance Operations",
    },
    "cash-flow-visibility-automation.ts": {
        seoTitle: "13-Week Cash Flow Forecast Automation",
        articleSection: "Finance Operations",
    },
    "month-end-close-automation.ts": {
        seoTitle: "Month-End Close Automation in Australia",
        articleSection: "Finance Operations",
    },
    "ai-invoice-data-extraction.ts": {
        seoTitle: "Invoice Data Extraction for AP Automation",
        articleSection: "Finance Operations",
    },
    "building-vs-buying-custom-automation.ts": {
        seoTitle: "Build vs Buy Automation for Finance Teams",
        articleSection: "Finance Operations",
    },
    "why-manual-eudr-compliance-fails.ts": {
        seoTitle: "Why Manual EUDR Compliance Fails",
        articleSection: "Regulatory Compliance",
    },
    "consultancy-trap.ts": {
        seoTitle: "The Consultancy Trap in Compliance Delivery",
        articleSection: "Regulatory Compliance",
    },
    "regops-technical.ts": {
        seoTitle: "RegOps Bridge Architecture for Compliance",
        articleSection: "Regulatory Compliance",
    },
    "compliance-automation-done-right.ts": {
        seoTitle: "Compliance Automation Done Right",
        articleSection: "Regulatory Compliance",
    },
    "regops-strategy.ts": {
        seoTitle: "RegOps for ESG Consultancy Scale",
        articleSection: "Regulatory Compliance",
    },
    "why-consultancies-get-stuck.ts": {
        seoTitle: "Why Compliance Consultancies Get Stuck",
        articleSection: "Regulatory Compliance",
    },
};

describe("SEO metadata", () => {
    it("defines shortened SEO titles and article sections for every blog post", () => {
        for (const [file, expectation] of Object.entries(blogExpectations)) {
            const source = read(join("lib/blog-posts", file));
            assert.match(source, new RegExp(`seoTitle:\\s*"${expectation.seoTitle}"`), file);
            assert.match(
                source,
                new RegExp(`articleSection:\\s*"${expectation.articleSection}"`),
                file
            );
        }
    });

    it("uses blog SEO titles and correct BlogPosting schema fields", () => {
        const source = read("app/blog/[slug]/page.tsx");
        assert.match(source, /title:\s*\{\s*absolute:\s*post\.seoTitle\s*\?\?\s*post\.title\s*\}/);
        assert.doesNotMatch(source, /INVARITECH Blog/);
        assert.match(source, /articleSection:\s*post\.articleSection/);
        assert.match(source, /keywords:\s*post\.tags\.join\(", "\)/);
        assert.match(source, /url:\s*`\$\{baseUrl\}\/logo-image\.png`/);
    });

    it("keeps broad blog index metadata aligned to finance operations and compliance", () => {
        const source = read("app/blog/page.tsx");
        assert.match(source, /title:\s*"Accounts Payable Controls & Finance Automation Blog"/);
        assert.match(source, /AP controls, invoice approval workflows, duplicate payment prevention, and finance automation/);
        assert.match(source, /Finance Operations & Compliance Automation Guides/);
    });

    it("uses shortened page titles for launch-critical pages", () => {
        const expectedTitles = new Map([
            ["app/resources/page.tsx", "AP Automation Resources & Templates"],
            ["app/work/page.tsx", "Payment Controls Work & Proof"],
            ["app/about/page.tsx", "About INVARITECH | Payment Controls for Australian Finance Teams"],
            ["app/work/eudr-compliance-bridge/page.tsx", "EUDR Compliance Bridge Case Study"],
            ["app/resources/invoice-extractor/page.tsx", "Invoice Data Extractor for AP Teams"],
            ["app/resources/cost-to-close-calculator/page.tsx", "Month-End Close Cost Calculator"],
        ]);

        for (const [path, title] of expectedTitles) {
            assert.match(read(path), new RegExp(`title:\\s*"${title}"`), path);
        }
    });

    it("marks the interactive resource page noindex and keeps AU locale signals", () => {
        const interactiveSource = read(
            "app/resources/supplier-payment-control-rule-table/interactive/page.tsx"
        );
        assert.match(interactiveSource, /import\s+\{\s*Metadata\s*\}\s+from\s+"next"/);
        assert.match(interactiveSource, /metadata:\s*Metadata/);
        assert.match(interactiveSource, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/);

        const layoutSource = read("app/layout.tsx");
        assert.match(layoutSource, /locale:\s*"en_AU"/);
        assert.match(layoutSource, /<html lang="en-AU"/);
    });

    it("keeps homepage structured data fresh and lead-gen tools prioritized in sitemap", () => {
        assert.match(
            read("app/structured-data.ts"),
            /HOMEPAGE_LAST_MODIFIED = "2026-05-15T00:00:00.000Z"/
        );

        const sitemapSource = read("app/sitemap.ts");
        assert.match(
            sitemapSource,
            /url: `\$\{baseUrl\}\/resources\/invoice-extractor\/`,[\s\S]*?priority: 0\.8/
        );
        assert.match(
            sitemapSource,
            /url: `\$\{baseUrl\}\/resources\/cost-to-close-calculator\/`,[\s\S]*?priority: 0\.8/
        );
    });

    it("surfaces Finance Automation and the audit CTA in primary discovery paths", () => {
        const headerSource = read("components/header.tsx");
        assert.match(headerSource, /\{\s*name:\s*"Finance Automation",\s*href:\s*"\/finance-exception-automation"/);
        assert.match(headerSource, /\{\s*name:\s*"Book Audit",\s*href:\s*"\/contact\?audit=1"/);

        const footerSource = read("components/footer.tsx");
        assert.match(footerSource, /\{\s*title:\s*"Finance Automation",\s*href:\s*"\/finance-exception-automation\/"/);

        assert.match(read("app/contact/page.tsx"), /"Book a Finance Exception Audit Call"/);

        for (const path of [
            "components/resource-library-client.tsx",
            "app/blog/page.tsx",
            "app/blog/[slug]/page.tsx",
            "app/work/page.tsx",
            "app/work/eudr-compliance-bridge/page.tsx",
        ]) {
            const source = read(path);
            assert.match(source, /href="\/contact\?audit=1/, path);
        }
    });
});
