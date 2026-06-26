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

    it("keeps broad blog index metadata aligned to Finance Ops and RegOps automation", () => {
        const source = read("app/blog/page.tsx");
        assert.match(source, /title:\s*"Finance Ops and RegOps Automation Blog"/);
        assert.match(source, /Practical guides for Finance Ops and RegOps automation: accounts payable workflows, compliance evidence, regulated submissions, and workflow design\./);
        assert.match(source, /Practical writing for Finance Ops and RegOps automation\./);
        assert.match(source, /href="\/contact\/\?diagnostic=1"/);
        assert.match(source, /Share a Workflow/);
    });

    it("uses strategic page titles for launch-critical pages", () => {
        const expectedTitles = new Map([
            ["app/layout.tsx", /default:\s*"Finance Ops and RegOps Automation \| INVARITECH"/],
            ["app/work/page.tsx", /title:\s*"Finance Ops and RegOps Automation Work"/],
            ["app/about/page.tsx", /title:\s*\{\s*absolute:\s*"About INVARITECH \| Finance Ops and RegOps Automation"\s*\}/],
            ["app/contact/page.tsx", /title:\s*"Book a Finance Workflow Diagnostic"/],
            ["app/resources/page.tsx", /title:\s*"Finance Ops and RegOps Tools and Resources"/],
            ["app/work/eudr-compliance-bridge/page.tsx", /title:\s*"EUDR RegOps Bridge Case Study"/],
            ["app/resources/invoice-extractor/page.tsx", /title:\s*"Invoice Data Extractor for AP Teams"/],
            ["app/resources/cost-to-close-calculator/page.tsx", /title:\s*"Month-End Close Cost Calculator"/],
        ]);

        for (const [path, pattern] of expectedTitles) {
            assert.match(read(path), pattern, path);
        }
    });

    it("marks the interactive resource page noindex and keeps global locale signals", () => {
        const interactiveSource = read(
            "app/resources/supplier-payment-control-rule-table/interactive/page.tsx"
        );
        assert.match(interactiveSource, /import\s+\{\s*Metadata\s*\}\s+from\s+"next"/);
        assert.match(interactiveSource, /metadata:\s*Metadata/);
        assert.match(interactiveSource, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/);

        const layoutSource = read("app/layout.tsx");
        assert.match(layoutSource, /locale:\s*"en"/);
        assert.match(layoutSource, /<html lang="en"/);
        assert.doesNotMatch(layoutSource, /en_AU|en-AU/);
    });

    it("keeps structured data aligned to global finance operations and RegOps automation", () => {
        const structuredDataSource = read("app/structured-data.ts");
        assert.match(
            structuredDataSource,
            /HOMEPAGE_LAST_MODIFIED = "2026-05-15T00:00:00.000Z"/
        );
        assert.match(
            structuredDataSource,
            /Invaritech builds Finance Ops and RegOps automation for teams handling messy documents, approvals, exceptions, and evidence trails around existing systems\./
        );
        assert.match(
            structuredDataSource,
            /logo:\s*\{[\s\S]*?url:\s*"https:\/\/www\.invaritech\.ai\/logo-image\.png",[\s\S]*?width:\s*516,[\s\S]*?height:\s*516,[\s\S]*?\}/
        );
        assert.match(
            structuredDataSource,
            /image:\s*\{[\s\S]*?url:\s*"https:\/\/www\.invaritech\.ai\/logo-image\.png",[\s\S]*?width:\s*516,[\s\S]*?height:\s*516,[\s\S]*?\}/
        );
        assert.match(
            structuredDataSource,
            /primaryImageOfPage:\s*\{[\s\S]*?url:\s*"https:\/\/www\.invaritech\.ai\/og-image\.png",[\s\S]*?width:\s*1200,[\s\S]*?height:\s*630,[\s\S]*?\}/
        );
        assert.match(structuredDataSource, /Finance Ops and RegOps Automation \| INVARITECH/);
        assert.match(structuredDataSource, /Finance Operations Automation/);
        assert.match(structuredDataSource, /RegOps Automation/);
        assert.match(structuredDataSource, /name:\s*"Worldwide"/);
        assert.match(structuredDataSource, /name:\s*"APAC"/);
        assert.doesNotMatch(structuredDataSource, /Australian Finance Teams|Country",\s*name:\s*"Australia"/);
    });

    it("keeps finance tools prioritized in sitemap", () => {

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

    it("keeps the web app manifest aligned to the pivot", () => {
        const manifestSource = read("app/manifest.ts");
        assert.match(manifestSource, /name:\s*"INVARITECH Finance Ops and RegOps Automation"/);
        assert.match(manifestSource, /short_name:\s*"INVARITECH"/);
        assert.match(
            manifestSource,
            /Finance Ops and RegOps automation around the systems teams already use\./
        );
        assert.doesNotMatch(manifestSource, /AP Payment Controls|Australia/);
    });

    it("surfaces the pillar navigation and primary CTA in discovery paths", () => {
        const headerSource = read("components/header.tsx");
        assert.match(headerSource, /primaryDiagnosticCta/);

        const brandSource = read("lib/site-content/brand.ts");
        assert.match(brandSource, /label:\s*"Share a Workflow"/);
        assert.match(brandSource, /href:\s*"\/contact\/\?diagnostic=1"/);

        const footerSource = read("components/footer.tsx");
        assert.match(footerSource, /footerFinanceLinks/);
        assert.match(footerSource, /footerProofLinks/);

        assert.match(read("app/contact/page.tsx"), /"Book a Finance Workflow Diagnostic"/);

        for (const path of [
            "components/resource-library-client.tsx",
            "app/blog/page.tsx",
            "app/work/page.tsx",
            "app/work/eudr-compliance-bridge/page.tsx",
        ]) {
            const source = read(path);
            assert.match(source, /\/contact\/\?diagnostic=1|primaryDiagnosticCta\.href/, path);
        }
    });

    it("uses the diagnostic CTA on blog article pages", () => {
        const source = read("app/blog/[slug]/page.tsx");
        assert.match(source, /Share a Workflow/);
        assert.match(source, /href="\/contact\/\?diagnostic=1&src=blog"/);
        assert.match(source, /image:\s*\{\s*"@type":\s*"ImageObject",\s*url:\s*imageUrl\s*\}/);
        assert.match(source, /logo:\s*\{\s*"@type":\s*"ImageObject",\s*url:\s*`\$\{baseUrl\}\/logo-image\.png`,\s*width:\s*516,\s*height:\s*516\s*\}/);
        assert.doesNotMatch(source, /image:\s*\{[\s\S]*?width:\s*1200,\s*height:\s*630/);
        assert.doesNotMatch(source, /Book a Finance Exception Audit/);
        assert.doesNotMatch(source, /\/contact\?audit=1/);
    });
});
