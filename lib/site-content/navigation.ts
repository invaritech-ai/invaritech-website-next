import type { NavigationItem } from "./types";

export const primaryNavigation = [
    { label: "Finance", href: "/finance-automation/" },
    { label: "Compliance", href: "/regulatory-operations-automation/" },
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
    { label: "Finance Automation Hub", href: "/finance-automation/" },
    { label: "Payment Control Rules", href: "/resources/supplier-payment-control-rule-table/" },
    { label: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { label: "Cost-to-Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { label: "Three-Way Matcher", href: "/glossary/three-way-match/" },
] satisfies NavigationItem[];

export const footerProofLinks = [
    { label: "Compliance Automation Hub", href: "/regulatory-operations-automation/" },
    { label: "EUDR Compliance Bridge", href: "/work/eudr-compliance-bridge/" },
    { label: "Proof Library", href: "/work/" },
    { label: "Tools", href: "/resources/#tools" },
] satisfies NavigationItem[];
