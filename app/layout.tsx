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
  themeColor: "#F4F1EA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4F1EA] text-[#111214] font-sans antialiased">
        <SiteHeader overlay={false} cartCount={0} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
