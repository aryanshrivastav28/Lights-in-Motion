"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATALOG } from "@/lib/data/product-catalog";
import { useLocalization } from "@/context/LocalizationContext";
import { Container } from "@/components/ui/Container";
import { ReelsShowcase } from "@/components/shared/ReelsShowcase";
import { ArrowLeftIcon } from "@/components/ui/Icons";

export const StorefrontCatalog: React.FC = () => {
  const { t, formatPrice } = useLocalization();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get distinct products from catalog (ignoring aliases)
  const uniqueProducts = Object.values(PRODUCT_CATALOG).filter(
    (product, index, self) => self.findIndex((p) => p.id === product.id) === index
  );

  const categories = [
    { id: "ALL", label: "All Products" },
    { id: "TV Sync Set", label: "TV Sync Set" },
    { id: "Monitor Sync Set", label: "Monitor Sync Set" },
    { id: "LIGHTINMOTION Collection", label: "LIGHTINMOTION Collection" },
  ];

  const filteredProducts = uniqueProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "ALL" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.introduction.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full py-10 sm:py-16 min-h-[85vh] text-white">
      <Container size="wide">
        {/* Header Section matching screenshot */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)] animate-pulse" />
            <span>HARDWARE COLLECTION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.2em] uppercase text-white font-sans">
            LIGHT IN MOTION STORE
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Cinema-grade ambient lighting systems, sync boxes, and custom display backlights for monitors and home theaters.
          </p>

          <div className="pt-2 flex justify-center items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
            >
              <ArrowLeftIcon size={12} />
              <span>RETURN HOME</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-400 transition-colors cursor-pointer"
            >
              <span>ADMIN PANEL</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#0C0D11]/90 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#963b18] text-white shadow-[0_0_15px_rgba(150,59,24,0.4)] scale-100 font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#0C0D11]/90 border border-white/15 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none focus:border-white/40 transition-colors pl-9"
            />
            <svg
              className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Responsive Product Grid matching homepage 4-column layout */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] max-w-md mx-auto space-y-3">
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-neutral-400 font-sans">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("ALL");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#0B0C0E] rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between relative hover:border-white/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.95)] transition-all duration-300 group"
              >
                {/* Top Badge */}
                <div className="flex items-start justify-between relative z-10 min-h-[28px]">
                  <span className="text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1 rounded-r-md rounded-tl-md shadow-xs font-sans bg-[#E52E2E]">
                    {product.badge}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    IN STOCK
                  </span>
                </div>

                {/* Product Image Stage */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full aspect-[3/4] my-3.5 overflow-hidden rounded-xl bg-neutral-950 border border-white/[0.08] shadow-inner block"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Deal Banner */}
                <div className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-2xs mb-3 text-center">
                  <svg
                    className="w-3.5 h-3.5 shrink-0 text-amber-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 13C10.832 21 2 21 2 12c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6 0 9-8.832 9-10 9z"
                    />
                  </svg>
                  <span>Diwali Special Deal</span>
                </div>

                {/* Title & Price Information */}
                <div className="space-y-2 mt-1 flex-1 flex flex-col justify-between">
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-neutral-200 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Price Row dynamically formatted according to selected currency */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-white font-black text-lg sm:text-xl tracking-tight">
                      {formatPrice(product.basePriceInINR)}
                    </span>
                    {product.compareAtPriceInINR && (
                      <span className="text-neutral-500 line-through text-xs sm:text-sm font-normal">
                        {formatPrice(product.compareAtPriceInINR)}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-[#963b18] hover:bg-[#b0451c] text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 mt-4 transition-colors duration-200 shadow-md group/btn"
                >
                  <span>Shop Now</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Watch. Explore. Choose. Reels Video Showcase on Store Page */}
      <ReelsShowcase className="mt-20 border-t border-white/10" />
    </div>
  );
};

export default StorefrontCatalog;
