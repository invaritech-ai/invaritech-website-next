export const CLAIM_SOURCES = [
    {
        id: "accc-code-about",
        title: "About the Food and Grocery Code",
        authority: "ACCC",
        url: "https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/about-the-food-and-grocery-code",
    },
    {
        id: "accc-code-rights-responsibilities",
        title: "Rights and responsibilities under the Food and Grocery Code",
        authority: "ACCC",
        url: "https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/rights-and-responsibilities-under-the-food-and-grocery-code",
    },
    {
        id: "accc-code-disputes",
        title: "Resolving disputes under the Food and Grocery Code",
        authority: "ACCC",
        url: "https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/resolving-disputes-under-the-food-and-grocery-code",
    },
    {
        id: "food-grocery-code-legislation",
        title: "Competition and Consumer (Industry Codes-Food and Grocery) Regulations 2024",
        authority: "Federal Register of Legislation",
        url: "https://www.legislation.gov.au/F2024L01651/latest/text",
    },
] as const;

export type ClaimSource = (typeof CLAIM_SOURCES)[number];
export type ClaimSourceId = ClaimSource["id"];

export const claimSourcesById = new Map(
    CLAIM_SOURCES.map((source) => [source.id, source]),
);
