import type { NavigationItem } from "./types";

export const primaryNavigation = [
    { label: "Finance Ops", href: "/finance-operations-automation/" },
    { label: "RegOps", href: "/regulatory-operations-automation/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "Work", href: "/work/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerCompanyLinks = [
    { label: "Home", href: "/" },
    { label: "Finance Ops", href: "/finance-operations-automation/" },
    { label: "RegOps", href: "/regulatory-operations-automation/" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerFinanceLinks = [
    { label: "Finance Ops Hub", href: "/finance-operations-automation/" },
    { label: "Payment Control Rules", href: "/resources/supplier-payment-control-rule-table/" },
    { label: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { label: "Cost-to-Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { label: "Three-Way Matcher", href: "/glossary/three-way-match/" },
] satisfies NavigationItem[];

export const footerProofLinks = [
    { label: "RegOps Hub", href: "/regulatory-operations-automation/" },
    { label: "EUDR RegOps Bridge", href: "/work/eudr-compliance-bridge/" },
    { label: "Proof Library", href: "/work/" },
    { label: "Tools", href: "/resources/#tools" },
] satisfies NavigationItem[];
