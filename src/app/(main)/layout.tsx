import { generateMetadata } from "@/functions";
import { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personalized learning dashboard with Lumora AI",
  noIndex: true // We don't want search engines to index internal pages
});

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}

// Rest of the layout code 