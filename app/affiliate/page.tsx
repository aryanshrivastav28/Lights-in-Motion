"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    socialHandle: "",
    platform: "YouTube",
    audienceSize: "10k - 50k",
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
          type: "affiliate",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: `${formData.platform} (${formData.socialHandle})`,
          message: `[AUDIENCE: ${formData.audienceSize}] ${formData.message}`,
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
          socialHandle: "",
          platform: "YouTube",
          audienceSize: "10k - 50k",
          message: "",
        });
      } else {
        setError(data.error || "Failed to submit application.");
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
          <span className="text-black font-bold">Affiliate Program</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-semibold text-neutral-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Creators & Partners</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black font-sans leading-tight">
            LIGHTINMOTION Creator & Affiliate Program
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-4 leading-relaxed font-sans font-medium">
            Earn 10% to 15% recurring commissions, complimentary review units, and custom audience discount codes by showcasing true optical ambient sync to your community.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl">
          <div className="bg-white/80 p-6 rounded-2xl border border-black/10 shadow-xs space-y-2.5">
            <span className="text-2xl">💰</span>
            <h3 className="text-base font-extrabold text-black">Up to 15% Commission</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Earn top-tier payouts on every completed hardware order referred through your custom trackable link or coupon code.
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl border border-black/10 shadow-xs space-y-2.5">
            <span className="text-2xl">📦</span>
            <h3 className="text-base font-extrabold text-black">Free Hardware Review Units</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Verified tech, gaming, desk-setup, and interior creators receive full TV or Monitor Sync kits for unboxings and setup tours.
            </p>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl border border-black/10 shadow-xs space-y-2.5">
            <span className="text-2xl">⚡</span>
            <h3 className="text-base font-extrabold text-black">Dedicated Dashboard</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transparent live click tracking, conversion reports, and automated monthly payouts directly into your bank account.
            </p>
          </div>
        </div>

        {/* Form and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-black">Who We Are Looking For</h2>
              <ul className="text-xs sm:text-sm text-neutral-700 space-y-2.5 list-none">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Desk Setup & Battlestation Creators:</strong> Aesthetic desk tours, productivity creators, and cable-management enthusiasts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Gaming Streamers:</strong> Twitch, YouTube Gaming, and eSports competitors who want an edge in immersion.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Home Theater & Audiophile Reviewers:</strong> Cinephiles evaluating 4K HDR displays, OLEDs, and soundstage illumination.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#ECEAE4]/80 p-6 rounded-2xl border border-black/10 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold">Fast Approval</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Applications are reviewed within <strong>24 business hours</strong>. Approved creators receive an affiliate portal link and onboarding kit immediately.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-xl font-black text-black mb-1">Apply for Creator Program</h2>
            <p className="text-xs text-neutral-600 mb-6">Fill out your channel and audience details below.</p>

            {ticketId ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-base font-black text-emerald-950">Application Received: {ticketId}</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">{resultMessage}</p>
                <button
                  type="button"
                  onClick={() => setTicketId(null)}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-neutral-800"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="creator@channel.com"
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Primary Platform</label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>YouTube</option>
                      <option>Instagram</option>
                      <option>Twitch</option>
                      <option>Twitter / X</option>
                      <option>Tech Blog / Website</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Channel / Handle Link</label>
                    <input
                      type="text"
                      required
                      value={formData.socialHandle}
                      onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                      placeholder="@yourhandle or youtube.com/@..."
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Audience / Subscriber Size</label>
                    <select
                      value={formData.audienceSize}
                      onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                      className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl px-3 py-2.5 text-xs text-black outline-none focus:border-black/50"
                    >
                      <option>1k - 10k</option>
                      <option>10k - 50k</option>
                      <option>50k - 200k</option>
                      <option>200k+</option>
                    </select>
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

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1">Pitch / Content Ideas</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what kind of video or reel you plan to create..."
                    className="w-full bg-[#ECEAE4]/60 border border-black/15 rounded-xl p-3 text-xs text-black placeholder:text-neutral-500 outline-none focus:border-black/50 resize-none"
                  />
                </div>

                {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Submitting Application..." : "Submit Affiliate Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
