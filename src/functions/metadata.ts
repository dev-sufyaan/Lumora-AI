import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
    canonicalUrl?: string;
    structuredData?: Record<string, any>;
}

// Ensure we have a fallback for the app name if the environment variable is not set
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Lumora AI";

export const generateMetadata = ({
    title = `${APP_NAME} - Interactive Video Learning Platform`,
    description = "Transform passive video watching into active learning with AI-powered tools. Search-driven, practice-oriented learning journey with personalized assistance and outcome-focused courses",
    image = "/thumbnail.png",
    icons = [
        {
            rel: "icon",
            type: "image/png",
            url: "/icons/logo.png"
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/icons/favicon-32x32.png"
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/icons/favicon-16x16.png"
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/icons/apple-touch-icon.png"
        },
        {
            rel: "manifest",
            url: "/site.webmanifest"
        },
    ],
    noIndex = false,
    keywords = [
        "interactive video learning",
        "AI learning assistant",
        "active learning",
        "educational technology",
        "video-based learning",
        "personalized education",
        "AI-powered learning",
        "online courses",
        "e-learning platform",
        "educational AI",
        "interactive courses",
        "Lumora AI",
        "video search",
        "AI study assistant",
        "active video learning",
        "learning videos",
        "search-driven learning",
        "AI video learning platform"
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Lumora Team",
    twitterHandle = "@lumoraai",
    type = "website",
    locale = "en_US",
    alternates = {},
    publishedTime,
    modifiedTime,
    canonicalUrl,
    structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": APP_NAME,
        "description": description,
        "url": process.env.NEXT_PUBLIC_APP_URL || "https://lumoraai.in",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${process.env.NEXT_PUBLIC_APP_URL || "https://lumoraai.in"}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    }
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://lumoraai.in");
    const imageUrl = image ? new URL(image, metadataBase).toString() : null;
    const canonical = canonicalUrl ? new URL(canonicalUrl, metadataBase).toString() : metadataBase.toString();

    // Prepare other metadata properties with conditional checks
    const otherMetadata: Record<string, string | number | (string | number)[]> = {
        "structured-data": JSON.stringify(structuredData)
    };
    
    // Only add verification if they're defined
    if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
        otherMetadata["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_VERIFICATION;
    }
    
    if (process.env.NEXT_PUBLIC_BRAVE_VERIFICATION) {
        otherMetadata["brave-validation"] = process.env.NEXT_PUBLIC_BRAVE_VERIFICATION;
    }

    // Add Microsoft Tile meta tags
    otherMetadata["msapplication-TileColor"] = "#6366f1";
    otherMetadata["msapplication-TileImage"] = new URL("/icons/android-chrome-192x192.png", metadataBase).toString();

    return {
        metadataBase,
        // PWA manifest for SEO and mobile support
        manifest: "/site.webmanifest",
        // Apple mobile web app metadata
        appleWebApp: {
            capable: true,
            title: APP_NAME,
            statusBarStyle: "black-translucent"
        },
        title: {
            template: `%s | ${APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: APP_NAME,
        applicationName: APP_NAME,
        viewport: "width=device-width, initial-scale=1",
        themeColor: [
            { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
            { media: "(prefers-color-scheme: dark)", color: "#111827" }
        ],
        referrer: "strict-origin-when-cross-origin",
        category: "Education, e-learning, interactive learning platform",
        classification: "Interactive Video Learning Platform",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        
        // Canonical URL
        alternates: {
            canonical: canonical,
            ...alternates
        },

        // OpenGraph
        openGraph: {
            type,
            siteName: APP_NAME,
            title,
            description,
            url: canonical,
            ...(imageUrl && {
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title
                }]
            }),
            locale,
            alternateLocale: Object.keys(alternates),
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime })
        },

        // Twitter
        twitter: {
            card: imageUrl ? "summary_large_image" : "summary",
            site: twitterHandle,
            creator: twitterHandle,
            title,
            description,
            ...(imageUrl && { images: [imageUrl] })
        },

        // Robots
        robots: {
            index: !noIndex,
            follow: !noIndex,
            nocache: noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Verification - only include officially supported properties
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
            yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
            yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
        },
        
        // Structured data and additional verification
        other: otherMetadata,
    };
};