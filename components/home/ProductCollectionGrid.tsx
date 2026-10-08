"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocalization } from "@/context/LocalizationContext";

export interface CollectionProduct {
  id: string;
  badgeKey: "bestSelling" | "sale";
  titleKey: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: "TV Sync Set" | "Monitor Sync Set" | "LIGHTINMOTION Collection";
  slug: string;
}

const PRODUCTS: CollectionProduct[] = [
  {
    id: "tv-backlight",
    badgeKey: "bestSelling",
    titleKey: "tvBacklightTitle",
    price: 1699.0,
    compareAtPrice: 2199.0,
    image: "/products/tv-backlight/main.png",
    category: "TV Sync Set",
    slug: "tv-backlight",
  },
  {
    id: "monitor-backlight",
    badgeKey: "sale",
    titleKey: "monitorBacklightTitle",
    price: 1399.0,
    compareAtPrice: 1799.0,
    image: "/products/monitor-backlight/main.png",
    category: "Monitor Sync Set",
    slug: "monitor-backlight",
  },
  {
    id: "lamp-lights",
    badgeKey: "sale",
    titleKey: "lampLightTitle",
    price: 1899.0,
    compareAtPrice: 2499.0,
    image: "/products/lamp-lights/main.png",
    category: "LIGHTINMOTION Collection",
    slug: "lamp-lights",
  },
  {
    id: "bar-lights",
    badgeKey: "sale",
    titleKey: "monitorBarTitle",
    price: 1899.0,
    compareAtPrice: 2499.0,
    image: "/products/bar-lights/main.png",
    category: "Monitor Sync Set",
    slug: "bar-lights",
  },
  {
    id: "custom-sync-lights",
    badgeKey: "sale",
    titleKey: "customSyncTitle",
    price: 1000.0,
    compareAtPrice: 1499.0,
    image: "/products/custom-strip-light/main.png",
    category: "LIGHTINMOTION Collection",
    slug: "custom-strip-light",
  },
  {
    id: "cloud-lights",
    badgeKey: "sale",
    titleKey: "cloudLightsTitle",
    price: 2200.0,
    compareAtPrice: 2999.0,
    image: "/products/cloudlights/main.jpg",
    category: "LIGHTINMOTION Collection",
    slug: "cloudlights",
  },
];

export const ProductCollectionGrid: React.FC = () => {
  const { t, formatPrice } = useLocalization();
  const [activeTab, setActiveTab] = useState<string>("LIGHTINMOTION Collection");

  const tabs = [
    { id: "LIGHTINMOTION Collection", labelKey: "lightinmotionCollection" },
    { id: "TV Sync Set", labelKey: "tvSyncSet" },
    { id: "Monitor Sync Set", labelKey: "monitorSyncSet" },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "LIGHTINMOTION Collection") return true;
    return product.category === activeTab;
  });

  return (
    <section className="relative w-full bg-black py-16 sm:py-24 px-4 sm:px-6 md:px-10 text-white font-sans select-none border-t border-white/10">
      
      {/* Top Filter Category Tabs */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="bg-[#0D0E11]/90 backdrop-blur-md p-1.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.8)] border border-white/10 inline-flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#963b18] text-white shadow-[0_0_20px_rgba(150,59,24,0.4)] scale-100"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Products In One Line Responsive Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#0B0C0E] rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between relative hover:border-white/25 hover:shadow-[0_10px_40px_rgba(0,0,0,0.95)] transition-all duration-300 group"
          >
            {/* Top Badges Header */}
            <div className="flex items-start justify-between relative z-10 min-h-[28px]">
              <span
                className="text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1 rounded-r-md rounded-tl-md shadow-xs font-sans bg-[#E52E2E]"
              >
                {t(product.badgeKey)}
              </span>
            </div>

            {/* Product Image Stage */}
            <Link
              href={`/products/${product.slug}`}
              className="relative w-full aspect-[3/4] my-3.5 overflow-hidden rounded-xl bg-neutral-950 border border-white/[0.08] shadow-inner block"
            >
              <Image
                src={product.image}
                alt={t(product.titleKey)}
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
              <span>{t("diwaliDeal")}</span>
            </div>

            {/* Title & Price Information */}
            <div className="space-y-2 mt-1 flex-1 flex flex-col justify-between">
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-neutral-200 transition-colors">
                  {t(product.titleKey)}
                </h3>
              </Link>

              {/* Price Row dynamically formatted according to selected currency */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-white font-black text-lg sm:text-xl tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-neutral-500 line-through text-xs sm:text-sm font-normal">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/products/${product.slug}`}
              className="bg-[#963b18] hover:bg-[#b0451c] text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 mt-4 transition-colors duration-200 shadow-md group/btn"
            >
              <span>{t("shopNow")}</span>
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

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.983z" />
        </svg>
      </a>
    </section>
  );
};

export default ProductCollectionGrid;
