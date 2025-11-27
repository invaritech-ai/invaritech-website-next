import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.invaritech.ai";
    const currentDate = new Date();

    return [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/work/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/work/eudr-compliance-bridge/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/weekend-suite/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/compliance-bridge/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs/`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/careers/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/careers/full-stack-developer/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];
}
