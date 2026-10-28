"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function TermsOfServicePage() {
  return (
    <div className="w-full pt-28 sm:pt-32 pb-24 text-black min-h-screen">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-black transition-colors">Store</Link>
          <span>/</span>
          <span className="text-black font-bold">Terms of Service</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>Store Terms & Conditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Welcome to LIGHTINMOTION. By browsing our website, placing an order, or downloading our companion software, you agree to comply with the terms and conditions outlined below.
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl space-y-8 text-neutral-800 leading-relaxed font-sans">
          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">1. Overview & Acceptance</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              This website is operated by LIGHTINMOTION Hardware Technologies. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to LIGHTINMOTION. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">2. Product Specifications & Pricing</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any product variant (e.g. specific screen size or LED length) without prior notice. We make every effort to display the true colors, materials, and luminous output of our ambient strips as accurately as possible.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">3. Order Accuracy & Billing</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">4. Intellectual Property</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              All firmware, companion application code, UI designs, brand marks, and video demonstrations on LIGHTINMOTION are the exclusive intellectual property of LIGHTINMOTION. You agree not to decompile, reverse-engineer, clone, or redistribute the proprietary microcode or companion applications without explicit written permission.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">5. Governing Law</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              These Terms of Service and any separate agreements whereby we provide you goods or services shall be governed by and construed in accordance with the laws of India, with jurisdiction in the courts of Bengaluru, Karnataka.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
