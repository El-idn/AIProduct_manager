import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StoreHydration } from "@/components/providers/store-hydration";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProdPilot AI — AI Product Management Workspace",
  description:
    "An AI-powered product management workspace for PRDs, prioritization, analytics, and copilot assistance.",
  openGraph: {
    title: "ProdPilot AI",
    description: "AI-native product management for modern teams",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <StoreHydration>{children}</StoreHydration>
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  );
}
