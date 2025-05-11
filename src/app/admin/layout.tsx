import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Lumora AI",
  description: "Administrative dashboard for Lumora AI",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 