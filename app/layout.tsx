import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LocalizationProvider } from "@/context/LocalizationContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
  themeColor: "#000000",
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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <LocalizationProvider>
          <SiteHeader overlay={true} cartCount={0} />
          <main>{children}</main>
          <SiteFooter />
        </LocalizationProvider>
      </body>
    </html>
  );
}
