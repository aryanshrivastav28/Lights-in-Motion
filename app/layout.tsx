import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Light in Motion — A Cinema Experience at Home",
  description:
    "Premium ambient lighting systems for gaming, monitors, TVs, and home theaters.",
  keywords: [
    "Light in Motion",
    "ambient lighting",
    "cinema experience",
    "gaming setup",
    "monitor backlights",
    "TV backlight sync",
  ],
  authors: [{ name: "Light in Motion" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070709] text-[#F3F4F6] antialiased">
        <SiteHeader overlay={false} cartCount={0} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
