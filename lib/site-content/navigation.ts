import type { NavigationItem } from "./types";

export const primaryNavigation = [
    { label: "Home", href: "/" },
    { label: "Finance Automation", href: "/finance-exception-automation/" },
    { label: "RegOps", href: "/work/eudr-compliance-bridge/" },
    { label: "Tools", href: "/resources/#tools" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/#guides" },
    { label: "About", href: "/about/" },
] satisfies NavigationItem[];

export const footerCompanyLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerFinanceLinks = [
    { label: "Finance Automation", href: "/finance-exception-automation/" },
    { label: "Payment Control Rules", href: "/resources/supplier-payment-control-rule-table/" },
    { label: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { label: "Cost-to-Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { label: "Three-Way Matcher", href: "/glossary/three-way-match/" },
] satisfies NavigationItem[];

export const footerProofLinks = [
    { label: "EUDR RegOps Bridge", href: "/work/eudr-compliance-bridge/" },
    { label: "Proof Library", href: "/work/" },
    { label: "Tools", href: "/resources/#tools" },
] satisfies NavigationItem[];
