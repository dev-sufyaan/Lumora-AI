import { generateMetadata } from "@/functions";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personalized learning dashboard with Lumora AI",
  noIndex: true // We don't want search engines to index internal pages
});

// Rest of the layout code 