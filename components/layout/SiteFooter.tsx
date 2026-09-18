import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/[0.08] select-none">
      <Container size="wide" className="pt-16 pb-12">
        {/* Brand Statement */}
        <div className="pb-12 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-white">
              LIGHT IN MOTION
            </span>
            <p className="text-sm font-sans text-neutral-400 tracking-wide">
              A cinema experience at home.
            </p>
          </div>
        </div>

        {/* Structured Columns (Valid Links Only) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08]">
          {/* SHOP */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              SHOP
            </div>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider">
              <li>
                <Link
                  href="/store"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* APPLICATION */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              SOFTWARE
            </div>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider">
              <li>
                <Link
                  href="/app"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  App Download
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              CONNECT
            </div>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-cyan-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-cyan-400 transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* BRAND VISION */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              BRAND
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Precision ambient illumination systems designed for high-refresh gaming displays and immersive home theaters.
            </p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <p className="tracking-wider">&copy; Light in Motion</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] tracking-widest uppercase">
            <span className="text-neutral-500">Privacy</span>
            <span className="text-neutral-500">Terms</span>
            <span className="text-neutral-500">Shipping</span>
            <span className="text-neutral-500">Refund Policy</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
