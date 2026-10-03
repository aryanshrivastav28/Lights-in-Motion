import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { 
  HardwareIcon, 
  ExternalLinkIcon, 
  SlidersIcon, 
  CartIcon
} from "@/components/ui/Icons";

export const metadata = {
  title: "Admin Terminal | Light in Motion",
  description: "Hardware & Catalog Management Control Plane",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070709] text-neutral-200 antialiased selection:bg-cyan-500 selection:text-black">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070709]/80 backdrop-blur-md">
        <Container size="wide">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Terminal Tag */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2 group">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)] animate-pulse" />
                <span className="font-mono text-sm tracking-[0.2em] font-bold text-white uppercase group-hover:text-cyan-400 transition-colors">
                  LIGHT IN MOTION
                </span>
              </Link>
              <span className="px-2 py-0.5 rounded-sm bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                ADMIN TERMINAL
              </span>
            </div>

            {/* Navigation links */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/admin"
                className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/admin/products"
                className="px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                Products
              </Link>
              <Link
                href="/admin/products/new"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                <span>+ New Product</span>
              </Link>
              <div className="w-[1px] h-4 bg-white/10 mx-1" />
              <Link
                href="/store"
                target="_blank"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <span>View Store</span>
                <ExternalLinkIcon size={12} className="opacity-70" />
              </Link>
            </nav>
          </div>
        </Container>
      </header>

      {/* Main Admin Content Body */}
      <main className="py-8 sm:py-12">
        <Container size="wide">
          {children}
        </Container>
      </main>
    </div>
  );
}
