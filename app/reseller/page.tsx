"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ResellerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "Electronics Retailer",
    estimatedVolume: "25 - 50 units / month",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResultMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reseller",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: `[BIZ TYPE: ${formData.businessType} | VOL: ${formData.estimatedVolume}] ${formData.message}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResultMessage(data.message);
        setTicketId(data.ticketId);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          businessType: "Electronics Retailer",
          estimatedVolume: "25 - 50 units / month",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit wholesale inquiry.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-28 sm:pt-32 pb-24 text-black min-h-screen">
      <Container size="wide">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black font-bold">Authorized Reseller & Wholesale</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span>B2B & Distribution</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            LIGHTINMOTION Authorized Reseller & Distribution
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Partner with India&apos;s leading optical ambient hardware manufacturer. Wholesale volume pricing, white-label custom installations, and dedicated priority warranty for retailers and system integrators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
          {/* Left Column: B2B Program Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">Wholesale Benefits</h2>
              <ul className="text-xs sm:text-sm text-neutral-700 space-y-3 list-none">
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span><strong>Tiered Margin Discounts:</strong> Aggressive wholesale pricing starting from MOQ 10 units up to container-level shipments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span><strong>Custom Reel Lengths:</strong> Direct access to 10M, 20M, and custom architectural LED reels for gaming cafes and boutique interiors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span><strong>Direct RMA Warranty Replacement:</strong> Swap defective units directly from your distributor buffer stock with instantaneous credit.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span><strong>POS Marketing Collateral:</strong> High-resolution counter displays, promotional acrylic stands, and video demo loops.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#ECEAE4]/80 p-6 rounded-2xl border border-black/10 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold">GST Invoicing</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Full B2B GST tax invoices provided with 100% input tax credit (ITC) eligibility for registered businesses in India.
              </p>
            </div>
          </div>

          {/* Right Column: Wholesale Inquiry Form */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-xl font-black text-black mb-1">Wholesale & Reseller Inquiry</h2>
            <p className="text-xs text-neutral-600 mb-6">Our distribution director will connect with customized price tiers.</p>

            {ticketId ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-base font-black text-emerald-950">Inquiry Logged: {ticketId}</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">{resultMessage}</p>
                <button
                  type="button"
                  onClick={() => setTicketId(null)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-neutral-800"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Company / Store Name</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex PC Builds & Systems"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Business Nature</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>Electronics Retailer</option>
                      <option>Custom PC System Integrator</option>
                      <option>Interior Designer / Architect</option>
                      <option>Gaming Cafe / eSports Arena</option>
                      <option>E-commerce Reseller</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Estimated Monthly Volume</label>
                    <select
                      value={formData.estimatedVolume}
                      onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>10 - 25 units / month</option>
                      <option>25 - 50 units / month</option>
                      <option>50 - 150 units / month</option>
                      <option>150+ units / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Message / Specific Requirements</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify target display sizes, delivery cities, or timeline..."
                    className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl p-3 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50 resize-none"
                  />
                </div>

                {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Submitting Inquiry..." : "Request Wholesale Pricing"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
