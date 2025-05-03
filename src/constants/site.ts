export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Lumora AI";

export const APP_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN || "lumora-ai.vercel.app"}`;

export const APP_HOSTNAMES = new Set([
    process.env.NEXT_PUBLIC_APP_DOMAIN || "lumora-ai.vercel.app",
    `www.${process.env.NEXT_PUBLIC_APP_DOMAIN || "lumora-ai.vercel.app"}`,
]);
