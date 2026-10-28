"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ReturnsPolicyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    reason: "Transit Damage / Defect",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
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
          type: "return",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          orderId: formData.orderId,
          message: `[REASON: ${formData.reason}] ${formData.message}`,
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
          reason: "Transit Damage / Defect",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit replacement request.");
      }
    } catch {
      setError("Network error. Please try again or email support@lightinmotion.com.");
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
          <span className="text-black font-bold">Return & Replacement Policy</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>7-Day Replacement Guarantee</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            Return & Replacement Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            We stand behind every LIGHTINMOTION ambient lighting system with an uncompromising 7-Day Hassle-Free Replacement Guarantee. If anything arrives damaged, defective, or misaligned, we replace it immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
          {/* Left Column: Policy Guidelines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">1. 7-Day Doorstep Replacement Guarantee</h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                If your LIGHTINMOTION hardware displays any manufacturing defect, dead LED nodes, HDMI passthrough failure, or transit damage within 7 days of package delivery, you are eligible for an immediate, no-questions-asked doorstep unit replacement.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 font-medium">
                ✓ Free reverse courier pickup arranged directly from your doorstep by BlueDart or Delhivery.
              </div>
            </div>

            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">2. Transit Damage & Dead on Arrival (DOA)</h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                All our packaging is shock-proofed, but if an outer box shows severe mishandling or water exposure during transit, please take a quick unboxing video or photograph. Upon submitting the form, our operations team prioritizes DOA tickets within 4 business hours.
              </p>
            </div>

            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">3. Conditions for Replacement</h2>
              <ul className="text-xs sm:text-sm text-neutral-700 space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span>Items must be returned with original accessories (controller box, power supply, corner brackets, and cables).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span>Adhesive backing on LED strips should not be completely stripped and contaminated with plaster or glue (you may test the lighting strips before mounting permanently).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black font-bold mt-0.5">•</span>
                  <span>Products damaged due to unauthorized opening, liquid immersion, or external high-voltage electrical surges are covered under our repair/warranty service rather than 7-day DOA replacement.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Replacement Submission Form */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-xl font-black text-black mb-1">Submit Replacement Request</h2>
            <p className="text-xs text-neutral-600 mb-6">Connected directly to LIGHTINMOTION Fulfilment Desk.</p>

            {ticketId ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-base font-black text-emerald-950">Ticket Logged: {ticketId}</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">{resultMessage}</p>
                <button
                  type="button"
                  onClick={() => setTicketId(null)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-neutral-800"
                >
                  Submit Another Request
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
                    placeholder="e.g. Rahul Sharma"
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
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Order ID</label>
                    <input
                      type="text"
                      required
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      placeholder="e.g. LIM-48201"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Reason</label>
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>Transit Damage / Defect</option>
                      <option>LED Node Non-Functional</option>
                      <option>Sync Controller Issue</option>
                      <option>Incorrect Size Delivered</option>
                      <option>Other / Not Listed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Describe Issue</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on what you observed (e.g. blue LEDs not responding on bottom strip)..."
                    className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl p-3 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50 resize-none"
                  />
                </div>

                {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Logging Ticket..." : "Submit Replacement Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
