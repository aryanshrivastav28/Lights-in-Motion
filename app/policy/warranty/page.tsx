"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function WarrantyPolicyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    productModel: "LIGHTINMOTION TV Sync Light",
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
          type: "warranty",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          orderId: formData.orderId,
          variant: formData.productModel,
          message: formData.message,
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
          orderId: "",
          productModel: "LIGHTINMOTION TV Sync Light",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit warranty claim.");
      }
    } catch {
      setError("Network error. Please try again later.");
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
          <Link href="/store" className="hover:text-black transition-colors">Store</Link>
          <span>/</span>
          <span className="text-black font-bold">1-Year Warranty</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Hardware Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            1-Year Comprehensive Manufacturer Warranty
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Every genuine LIGHTINMOTION ambient lighting system is backed by our full 1-Year Manufacturer Warranty covering sync hardware, microcontrollers, LED circuits, and power modules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
          {/* Left Column: Scope of Coverage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">What Is Covered Under Warranty</h2>
              <ul className="text-xs sm:text-sm text-neutral-800 space-y-2.5 list-none">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>Microcontroller & DSP Sync Box:</strong> Hardware failures, HDMI passthrough signal loss, or Wi-Fi/Bluetooth connectivity issues.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>Addressable LED Strips:</strong> Individual pixel burn-outs, IC controller failure, color degradation, or erratic flickering under standard operating conditions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">✓</span>
                  <span><strong>High-Current Power Supply:</strong> 12V/5V DC adapter failure, internal surge protection circuit faults, or voltage sag.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">What Is Not Covered</h2>
              <ul className="text-xs sm:text-sm text-neutral-700 space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span>Physical tearing of LED copper traces caused by forceful folding or bending beyond specified corner radius.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span>Direct exposure to rain, water submersion, or installation outdoors in unshielded environments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400 font-bold">•</span>
                  <span>Damage caused by third-party unapproved power bricks with incorrect voltage polarity.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#ECEAE4]/80 p-6 rounded-2xl border border-black/10">
              <h3 className="text-sm font-black text-black uppercase tracking-wider mb-2 font-mono">Service Turnaround</h3>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                We maintain genuine replacement parts at our Bengaluru engineering lab. Warranty claims are verified and replacement modules are dispatched within <strong>48 hours</strong> of diagnosis.
              </p>
            </div>
          </div>

          {/* Right Column: Warranty Claim Form */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-xl font-black text-black mb-1">File a Warranty Claim</h2>
            <p className="text-xs text-neutral-600 mb-6">Our hardware engineers will troubleshoot or initiate replacement.</p>

            {ticketId ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-base font-black text-emerald-950">Warranty Ticket: {ticketId}</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">{resultMessage}</p>
                <button
                  type="button"
                  onClick={() => setTicketId(null)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-neutral-800"
                >
                  Submit Another Claim
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Verma"
                    className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Phone</label>
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
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Order / Serial No.</label>
                    <input
                      type="text"
                      required
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      placeholder="e.g. LIM-59124"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Hardware Model</label>
                    <select
                      value={formData.productModel}
                      onChange={(e) => setFormData({ ...formData, productModel: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>LIGHTINMOTION TV Sync Light</option>
                      <option>LIGHTINMOTION Monitor Sync Light</option>
                      <option>LIGHTINMOTION Custom Sync Light</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Issue Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how the unit is malfunctioning, power indicators, or error signals..."
                    className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl p-3 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50 resize-none"
                  />
                </div>

                {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Logging Claim..." : "Submit Warranty Claim"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
