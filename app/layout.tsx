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
  themeColor: "#F7F7F7",
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
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} min-h-screen text-black antialiased bg-[#f7f7f7]`}
        style={{
          backgroundImage: "url('/textures/crumpled-paper.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "850px 850px",
          backgroundAttachment: "fixed",
        }}
      >
        <LocalizationProvider>
          <SiteHeader overlay={true} cartCount={0} />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
        </LocalizationProvider>
      </body>
    </html>
  );
}
