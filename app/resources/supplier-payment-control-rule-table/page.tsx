import { Metadata } from "next";
import Script from "next/script";
import ResourceRuleTableClient from "@/components/resource-rule-table-client";

export const metadata: Metadata = {
    title: "Supplier Payment Control Rule Table for AP Teams",
    description:
        "Download a supplier payment control rule table for mapping payment approval checks, invoice exception routing, evidence, and audit notes before release.",
    alternates: {
        canonical:
            "https://www.invaritech.ai/resources/supplier-payment-control-rule-table/",
    },
    openGraph: {
        title: "Supplier Payment Control Rule Table for AP Teams — INVARITECH",
        description:
            "Workbook for mapping supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit trails.",
        url: "https://www.invaritech.ai/resources/supplier-payment-control-rule-table/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Supplier Payment Control Rule Table",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Supplier Payment Control Rule Table for AP Teams — INVARITECH",
        description:
            "Map supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit trails.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";

const schemas = [
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            {
                "@type": "ListItem",
                position: 2,
                name: "Resources",
                item: `${BASE}/resources/`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Supplier Payment Control Rule Table",
                item: `${BASE}/resources/supplier-payment-control-rule-table/`,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Supplier Payment Control Rule Table",
        description:
            "Rule table workbook for mapping supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit notes before release.",
        author: {
            "@type": "Organization",
            name: "INVARITECH",
            url: BASE,
        },
        url: `${BASE}/resources/supplier-payment-control-rule-table/`,
        encodingFormat:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
];

const APOLLO_INBOUND_SCRIPT = `(function initApolloInbound(){var TIMEOUT_MS=15000;var FORM_SELECTOR='#resource-download-form';var timeoutId;var isDone=false;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head||document.documentElement).appendChild(style);function cleanup(){isDone=true;var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}function initForm(){if(isDone)return;var form=document.querySelector(FORM_SELECTOR);if(!form){requestAnimationFrame(initForm);return;}var config={appId:'6a02957afcc7ee0019235ec4',formElement:'#resource-download-form',options:{autoDetect:false},onReady:function(){cleanup();},onError:function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}};try{if(window.ApolloInbound&&window.ApolloInbound.formEnrichment&&typeof window.ApolloInbound.formEnrichment.init==='function'){window.ApolloInbound.formEnrichment.init(config);return;}if(window.ApolloInbound&&typeof window.ApolloInbound.initFormEnrichment==='function'){window.ApolloInbound.initFormEnrichment(config);return;}throw new Error('ApolloInbound form enrichment API not found');}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout - revealing forms.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache='+nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=initForm;document.head.appendChild(script);})();`;

export default function RuleTablePage() {
    return (
        <>
            {schemas.map((schema, i) => (
                <Script
                    key={i}
                    id={`schema-rule-table-${i}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <Script
                id="apollo-inbound"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: APOLLO_INBOUND_SCRIPT,
                }}
            />
            <ResourceRuleTableClient />
        </>
    );
}
