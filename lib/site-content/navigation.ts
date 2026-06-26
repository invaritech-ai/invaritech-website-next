import type { NavigationItem } from "./types";

export const primaryNavigation = [
    { label: "Finance", href: "/finance-automation/" },
    { label: "Compliance", href: "/regulatory-operations-automation/" },
    {
        label: "Claims Desk",
        href: "https://claims-desk.invaritech.ai/?utm_source=invaritech&utm_medium=nav&utm_campaign=claims-desk",
    },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "Work", href: "/work/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerCompanyLinks = [
    { label: "Home", href: "/" },
    { label: "Finance", href: "/finance-automation/" },
    { label: "Compliance", href: "/regulatory-operations-automation/" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerFinanceLinks = [
    { label: "Finance Automation", href: "/finance-automation/" },
    { label: "AP Controls Checklist", href: "/resources/accounts-payable-controls/" },
    { label: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { label: "Cost-to-Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { label: "Three-Way Matcher", href: "/glossary/three-way-match/" },
] satisfies NavigationItem[];

export const footerProofLinks = [
    { label: "Compliance Automation", href: "/regulatory-operations-automation/" },
    { label: "EUDR Compliance Bridge", href: "/work/eudr-compliance-bridge/" },
    { label: "Case Studies", href: "/work/" },
    { label: "Tools", href: "/resources/#tools" },
] satisfies NavigationItem[];
