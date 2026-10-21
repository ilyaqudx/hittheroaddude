import { siteConfig } from "../../site.config";

export function generateSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": `https://${siteConfig.domain}`,
    "description": siteConfig.description,
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": siteConfig.name,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web browser",
    "description": siteConfig.description,
    "offers": [
      {
        "@type": "Offer",
        "name": siteConfig.pricing.solo.name,
        "price": siteConfig.pricing.solo.price,
        "priceCurrency": "USD",
      },
      {
        "@type": "Offer",
        "name": siteConfig.pricing.trio.name,
        "price": siteConfig.pricing.trio.price,
        "priceCurrency": "USD",
      },
      {
        "@type": "Offer",
        "name": siteConfig.pricing.crew.name,
        "price": siteConfig.pricing.crew.price,
        "priceCurrency": "USD",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": siteConfig.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return {
    websiteSchema,
    softwareSchema,
    faqSchema,
  };
}
