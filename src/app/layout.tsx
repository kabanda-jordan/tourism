import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/layout/app-shell";
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
  title: {
    default: "Trekly — Premium Vehicle Hiring & Tourism",
    template: "%s | Trekly",
  },
  description:
    "Discover Rwanda with premium vehicle hiring. Book SUVs, sedans, vans and luxury vehicles for your safari adventure. Trusted by thousands of travelers.",
  keywords: [
    "Rwanda car rental",
    "Rwanda safari vehicles",
    "vehicle hiring Rwanda",
    "Kigali car rental",
    "Rwanda tourism",
    "Volcanoes National Park",
    "Akagera safari",
    "Nyungwe forest",
  ],
  authors: [{ name: "Trekly" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Trekly",
    title: "Trekly — Premium Vehicle Hiring & Tourism",
    description:
      "Discover Rwanda with premium vehicle hiring. Book SUVs, sedans, vans and luxury vehicles for your safari adventure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
