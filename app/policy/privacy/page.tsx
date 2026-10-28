"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full pt-28 sm:pt-32 pb-24 text-black min-h-screen">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-black transition-colors">Store</Link>
          <span>/</span>
          <span className="text-black font-bold">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Effective Date: October 2026. At LIGHTINMOTION, your privacy and device security are fundamental to our hardware and software architecture. We never sell, monetize, or harvest your personal information.
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl space-y-8 text-neutral-800 leading-relaxed font-sans">
          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">1. Information We Collect</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              When you purchase or interact with LIGHTINMOTION products, we collect minimal data essential to fulfill your order and provide firmware updates:
            </p>
            <ul className="text-xs sm:text-sm text-neutral-700 space-y-1.5 list-disc pl-5">
              <li><strong>Order Information:</strong> Name, shipping address, billing address, email address, and phone number required for air courier tracking and invoice generation.</li>
              <li><strong>Payment Processing:</strong> Transactions are handled through PCI-DSS Level 1 compliant gateways (Razorpay/Stripe/UPI). LIGHTINMOTION never stores your full credit card numbers or banking PINs.</li>
              <li><strong>Device Telemetry:</strong> If you connect the LIGHTINMOTION desktop or Android TV app, the software processes screen pixels locally in RAM and sends zero video frames to external cloud servers.</li>
            </ul>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">2. Zero Video Cloud Streaming Guarantee</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              Our ambient sync algorithms operate entirely on-device (Edge DSP). When you use our TV sync box or PC sync application, color extraction happens locally at microsecond intervals. No image captures, screenshots, or streaming video content ever leave your local home network.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">3. How We Use Your Data</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              Your information is utilized solely for:
            </p>
            <ul className="text-xs sm:text-sm text-neutral-700 space-y-1.5 list-disc pl-5">
              <li>Processing, packing, and dispatching your hardware order.</li>
              <li>Sending automated WhatsApp/SMS tracking updates and invoice receipts.</li>
              <li>Providing hardware firmware updates and technical warranty support.</li>
              <li>Delivering product announcements or promotional deals only if explicitly opted into.</li>
            </ul>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">4. Data Retention & User Rights</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              You retain full rights to access, modify, or request permanent deletion of your customer records from our database. To request data deletion or an export of your purchase history, contact our privacy desk at <strong>privacy@lightinmotion.com</strong>.
            </p>
          </div>

          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xl font-black text-black">5. Cookies & Local Storage</h2>
            <p className="text-xs sm:text-sm text-neutral-700">
              Our website uses basic functional cookies and localStorage to persist your active shopping cart items, preferred currency (INR, USD, EUR, etc.), and language settings. We do not deploy intrusive third-party cross-site trackers.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
