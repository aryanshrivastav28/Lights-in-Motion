"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils/formatters";

export interface CollectionProduct {
  id: string;
  badge: "BEST SELLING" | "SALE" | string;
  isMostRecommended?: boolean;
  title: string;
  price: number;
  compareAtPrice: number;
  image: string;
  category: "TV Sync Set" | "Monitor Sync Set" | "Apex Collection";
  dealLabel: string;
  slug: string;
}

const PRODUCTS: CollectionProduct[] = [
  {
    id: "apex-hdmi-21",
    badge: "BEST SELLING",
    title: "Apex HDMI Sync TV Backlight ( HDMI 2.1 Version) (32-90 Inch TV size)",
    price: 8499,
    compareAtPrice: 9999,
    image: "/products/apex/apex-hdmi-21.png",
    category: "TV Sync Set",
    dealLabel: "Diwali Special Deal",
    slug: "tv-backlight",
  },
  {
    id: "apex-hdmi-20",
    badge: "SALE",
    title: "Apex HDMI Sync TV Backlight ( HDMI 2.0 )( Upto 75 inch TVs )",
    price: 7199,
    compareAtPrice: 8999,
    image: "/products/apex/apex-hdmi-20.png",
    category: "TV Sync Set",
    dealLabel: "Diwali Special Deal",
    slug: "tv-backlight",
  },
  {
    id: "apex-monitor-backlight",
    badge: "SALE",
    title: "Apex Monitor Backlight (Upto 40 Inches Monitor) (not for All Smart TVs)",
    price: 1999,
    compareAtPrice: 2299,
    image: "/products/monitor-backlight/main.png",
    category: "Monitor Sync Set",
    dealLabel: "Diwali Special Deal",
    slug: "monitor-backlight",
  },
  {
    id: "apex-uplighter-floor-lamp",
    badge: "SALE",
    title: "Apex Uplighter Floor Lamp",
    price: 10499,
    compareAtPrice: 12999,
    image: "/products/apex/apex-uplighter.png",
    category: "Apex Collection",
    dealLabel: "Diwali Special Deal",
    slug: "lamp-lights",
  },
  {
    id: "apex-dual-light-bars",
    badge: "SALE",
    title: "Apex Dual Ambient Light Bars (Screen & Audio Sync)",
    price: 4999,
    compareAtPrice: 6999,
    image: "/products/bar-lights/main.png",
    category: "Apex Collection",
    dealLabel: "Diwali Special Deal",
    slug: "bar-lights",
  },
  {
    id: "apex-custom-neon-strip",
    badge: "SALE",
    title: "Apex Custom Neon RGB Strip Light (Pixel Addressable)",
    price: 3499,
    compareAtPrice: 4499,
    image: "/products/custom-strip-light/main.png",
    category: "Apex Collection",
    dealLabel: "Diwali Special Deal",
    slug: "custom-strip-light",
  },
  {
    id: "apex-cloud-lighting",
    badge: "SALE",
    title: "Apex Cloud Lighting Station (Atmospheric Room Sync)",
    price: 6999,
    compareAtPrice: 8999,
    image: "/products/cloudlights/main.jpg",
    category: "Apex Collection",
    dealLabel: "Diwali Special Deal",
    slug: "cloudlights",
  },
];

export const ProductCollectionGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Apex Collection");

  const tabs = [
    { id: "Apex Collection", label: "Apex Collection" },
    { id: "TV Sync Set", label: "TV Sync Set" },
    { id: "Monitor Sync Set", label: "Monitor Sync Set" },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "Apex Collection") return true;
    return product.category === activeTab;
  });

  return (
    <section className="relative w-full bg-[#F4F6F9] py-16 sm:py-24 px-4 sm:px-8 md:px-12 text-neutral-900 font-sans select-none">
      
      {/* Top Filter Category Tabs */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-neutral-200/80 inline-flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-[#963b18] text-white shadow-sm scale-100"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Column Product Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-all duration-300 group"
          >
            {/* Top Badges Header */}
            <div className="flex items-start justify-between relative z-10 min-h-[32px]">
              {/* Left Badge: BEST SELLING / SALE */}
              <span
                className={`text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1 rounded-r-md rounded-tl-md shadow-xs font-sans ${
                  product.badge === "BEST SELLING"
                    ? "bg-[#E52E2E]"
                    : "bg-[#E52E2E]"
                }`}
              >
                {product.badge}
              </span>

              {/* Right Badge: MOST RECOMMENDED Emblem (Circular) */}
              {product.isMostRecommended && (
                <div className="w-16 h-16 rounded-full border-[2px] border-[#0084FF] flex flex-col items-center justify-center p-1 bg-white shadow-xs text-center -mt-1 -mr-1">
                  <svg
                    className="w-3.5 h-3.5 text-[#0084FF] mb-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[7.5px] font-extrabold text-[#0084FF] leading-none uppercase tracking-tighter">
                    MOST RECOMMENDED
                  </span>
                </div>
              )}
            </div>

            {/* Product Image Stage */}
            <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Diwali Special Deal Banner */}
            <div className="bg-[#FDF3E7] text-[#8C581E] border border-[#F5E1C9] text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-2xs mb-3 text-center">
              <svg
                className="w-3.5 h-3.5 shrink-0 text-[#8C581E]"
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
              <span>{product.dealLabel}</span>
            </div>

            {/* Title & Price Information */}
            <div className="space-y-2 mt-1 flex-1 flex flex-col justify-between">
              <h3 className="text-neutral-800 font-semibold text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.6rem]">
                {product.title}
              </h3>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-neutral-900 font-extrabold text-lg sm:text-xl tracking-tight">
                  Rs. {product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-neutral-400 line-through text-xs sm:text-sm font-normal">
                  Rs. {product.compareAtPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/store?product=${product.slug}`}
              className="bg-[#963b18] hover:bg-[#7d3012] text-white font-bold text-sm sm:text-base py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 mt-4 transition-colors duration-200 shadow-sm"
            >
              <span>Shop Now</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
